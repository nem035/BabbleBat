'use strict';

const _ = require('lodash');

// query to link a model A (by adding its id)
// to model B's array of A ids
const getLinkQuery = (linkName, linkId) => {
  const query = { $addToSet: {} };
  query.$addToSet[linkName] = linkId.toString();
  return query;
}

// query to link a model A (by adding its id)
// to model B's array of A ids
const getUnlinkQuery = (linkName, linkId) => {
  const query = { $pull: {} };
  query.$pull[linkName] = linkId.toString();
  return query;
}

// use the provided method to add a one-way link
// from model to linkedModel
const linkOneWay = (method, linkName) => {
  return (modelId, linkedModelId) => {
    const query = getLinkQuery(linkName, linkedModelId);
    return method(modelId, query);
  }
}

// use the provided method to remove a one-way link
// from model to linkedModel
const unlinkOneWay = (method, linkName) => {
  return (modelId, linkedModelId) => {
    const query = getUnlinkQuery(linkName, linkedModelId);
    return method(modelId, query);
  }
}

module.exports = function(methods, models) {
  
  const {
    userUpdateSingle,
    roomUpdateSingle,
    userFindOneAndUpdateSingle,
    roomFindOneAndUpdateSingle,
    roomCreateSingle,
    roomRemoveSingle,
    userFindMulti,
    roomFindMulti,
    messageFindMulti
  } = methods;
  
  // add a single room to a user
  methods.userAddRoomSingle = linkOneWay(userUpdateSingle, 'rooms');
  
  // add a single user to a room
  methods.roomAddUserSingle = linkOneWay(roomUpdateSingle, 'users');
  
  // add a single room to a user AND 
  // add same user to the same room
  methods.linkUserAndRoom = (userId, roomId) => {
    return Promise.all([
      methods.userAddRoomSingle(userId, roomId),
      methods.roomAddUserSingle(roomId, userId)
    ]);
  }
    
  // remove a single room from a user
  methods.userRemoveRoomSingle = unlinkOneWay(userUpdateSingle, 'rooms');

  // remove a single user from a room
  methods.roomRemoveUserSingle = unlinkOneWay(roomUpdateSingle, 'users');

  // remove a single room from a user AND
  // remove same user from the same room
  methods.unlinkUserAndRoom = (userId, roomId) => {
    return Promise.all([
      methods.userRemoveRoomSingle(userId, roomId),
      methods.roomRemoveUserSingle(roomId, userId)
    ]);
  }
  
  // remove room from multiple users
  methods.userRemoveRoomMulti = (userIds, roomId) => {
    const promises = [];
    userIds.forEach(userId => {
      promises.push(methods.userRemoveRoomSingle(userId, roomId));
    });
    
    return Promise.all(promises);
  }
  
  // find a room and unlink it from all of its users 
  methods.roomRemoveFromAllUsers = (roomId) => {
    return methods.roomFindSingle(roomId).then(
      (room) => {
        return methods.userRemoveRoomMulti(room.users, roomId);
      }
    );
  }
  
  // remove a room and unlink it from all of its users
  methods.roomRemoveCompleteSingle = (roomId) => {
    return methods.roomRemoveFromAllUsers(roomId).then(res => {
      return roomRemoveSingle(roomId);
    });
  }
  
  // creates a room and adds its id to the user's rooms array
  methods.roomCreateAndAddUserSingle = (roomData, userId) => {
    return roomCreateSingle(roomData).then(room => {
      return methods.userAddRoomSingle(userId, room.id);
    }); 
  }
  
  // connection
  
  // add the connection to a user
  methods.userAddConnection = (userId, connectionId) => {
    return userFindOneAndUpdateSingle(userId,
      { $set: { connection: connectionId.toString() } }
    );
  }
  // add the connection to a room
  methods.roomAddConnection = (roomId, connectionId) => {
    return roomFindOneAndUpdateSingle(roomId,
      { $addToSet: { connections: connectionId.toString() } }
    );
  }
  
  // remove a connection from a user
  methods.userRemoveConnection = (userId) => {
    return userFindOneAndUpdateSingle(userId,
      { $set: { connection: '' } }
    );
  }
  // remove a connection from a room
  methods.roomRemoveConnection = (roomId, connectionId) => {
    return roomFindOneAndUpdateSingle(roomId,
      { $pull: { connections: connectionId.toString() } }
    );
  }
  
  // add a connection to BOTH the user and the room
  methods.connectUserAndRoom = (userId, roomId, connectionId) => {
    return Promise.all([
      methods.roomAddConnection(roomId, connectionId),
      methods.userAddConnection(userId, connectionId)
    ]);
  }
  // remove a connection from BOTH the user and the room
  methods.disconnectUserAndRoom = (userId, roomId, connectionId) => {
    return Promise.all([
      methods.roomRemoveConnection(roomId, connectionId),
      methods.userRemoveConnection(userId, connectionId)
    ]);
  }
  
  // links (two-way) up the user and the room (if not linked already)
  // and connects them using the passed connection id
  methods.linkAndConnectUserAndRoom = (userId, roomId, connectionId) => {
    return methods.linkUserAndRoom(userId, roomId).then(() => {
     return methods.connectUserAndRoom(userId, roomId, connectionId); 
    });
  }
  
  // relation
  
  // find all users that have joined a room
  methods.userFindAllInRoom = (roomId) => {
    return userFindMulti({ rooms: roomId });
  }
  
  // find all rooms that have a user as a member
  methods.roomFindAllWithUser = (userId) => {
    return roomFindMulti({ users: userId });
  }
  
  // find all messages that belong to a room
  methods.messageFindAllInRoom = (roomId) => {
    return messageFindMulti({ room: roomId });
  }
  
  methods.roomFindAllUsersAndMessages = (roomId) => {
    return Promise.all([
      methods.userFindAllInRoom(roomId),
      methods.messageFindAllInRoom(roomId)
    ]);
  }
}