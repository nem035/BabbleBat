'use strict';

const { join: joinPaths } = require('path');
const { getUserId, splitRooms } = require(joinPaths(__dirname, 'helpers'));

module.exports = function(db, io) {
  
  const {
    methods : {
      roomFindAll,
      roomFindSingle,
      roomCreateAndAddUserSingle,
      roomRemoveSingle,
      unlinkUserAndRoom,
      roomRemoveCompleteSingle
    }
  } = db;
  
  const errorHandler = (err) => {
    console.log(err);
  };
    
 // queries the database for all rooms,
 // splits the rooms into categories
 // and notifies the users
  const emitAllRooms = (socket, shouldBroadcast) => {
    roomFindAll().then(rooms => {
      
      if (shouldBroadcast) {
        socket.broadcast.emit('resPublicRooms', rooms);
      }
      
      const userId = getUserId(socket); 
        
      const { 
        createdRooms, 
        joinedRooms, 
        publicRooms 
      } = splitRooms(userId, rooms);
      
      socket.emit('resPublicRooms', publicRooms);
      socket.emit('resUserRooms', createdRooms, joinedRooms);
    }, errorHandler);
  };
  
  io.of('/rooms').on('connection', socket => {
    
    emitAllRooms(socket);
       
    // creates a room with the given name
    // and adds the room id into the user's rooms array
    socket.on('reqCreateRoom', name => {
      const owner = getUserId(socket);
      roomCreateAndAddUserSingle({
        name,
        owner,
        users: [ owner ]
      }, owner).then(() => {
        emitAllRooms(socket, true);
      }).catch(errorHandler);
    });
    
    // remove the link between a user and a room
    socket.on('reqLeaveRoom', roomId => {
      const userId = getUserId(socket);
      unlinkUserAndRoom(userId, roomId).then(() => {
        emitAllRooms(socket, true);
      }, errorHandler);
    });
        
    // removes the room and unlinks it from all of its users
    socket.on('reqRemoveRoom', roomId => {
      roomRemoveCompleteSingle(roomId).then(res => {
        emitAllRooms(socket, true);
      }, errorHandler);
    });
  });
}