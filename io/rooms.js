'use strict';

module.exports = function(db, io) {
  
  const {
    methods : dbMethods,
    models  : dbModels
  } = db;
  
  const roomModel = dbModels['room'];
  const userModel = dbModels['user'];
  
  const errorHandler = (err) => {
    console.err(err);
  };
  
  const showAllRooms = (socket) => {
    dbMethods.findAll(roomModel).then(rooms => {
      
      const { userId } = socket; 
      
      const createdRooms = [], 
            joinedRooms = [],
            publicRooms = [];  
            
      rooms.forEach(
        room => {
          const hasCreated = room.owner === userId;
          const hasJoined = !hasCreated && room.users.indexOf(userId) !== -1;
          
          if (hasCreated) {
            createdRooms.push(room);
          } else if (hasJoined) {
            joinedRooms.push(room);
          } else {
            publicRooms.push(room);
          }
        }
      );

      socket.emit('resPublicRooms', publicRooms);
      socket.emit('resUserRooms', createdRooms, joinedRooms);
    }, errorHandler);
  };
  
  const broadcastAllRooms = (socket) => {
    dbMethods.findAll(roomModel).then(rooms => {
      showAllRooms(socket);
      socket.broadcast.emit('resPublicRooms', rooms);
    }, errorHandler);
  };
  
  io.of('/rooms').on('connection', socket => {
    
    socket.on('setUserId', (userId) => {
      socket.userId = userId;
      showAllRooms(socket);
    });
       
    socket.on('createRoom', name => {
      dbMethods.findOne(roomModel, { name }).then(
        (room) => {
          if (!room) {
            const owner = socket.userId;
            dbMethods.createOne(roomModel, {
              name,
              owner,
              users: [ owner ]
            }).then(
              (room) => {
                dbMethods.updateOne(
                  userModel, 
                  { _id: owner },
                  { $push: { rooms: room._id.toString() }}
                ).then(
                  res => broadcastAllRooms(socket), 
                  errorHandler
                );
              },
              errorHandler
            );
          } else {
            socket.emit('createRoomErr', {
              message: 'Name already taken'
            });
          }
        }
      ), errorHandler; 
    });
    
    socket.on('leaveRoom', id => {
      dbMethods.updateOne(
        roomModel, 
        { _id: id },
        { $pull: { users: socket.userId }}
      ).then(
        res => showAllRooms(socket), 
        errorHandler
      );
    });
    
    socket.on('removeRoom', roomId => {
      dbMethods.findById(roomModel, roomId).then(
        (room) => {
          room.users.forEach(userId => {
            dbMethods.updateOne(
              userModel, 
              { _id: userId },
              { $pull: { rooms: roomId }}
            ).then(
              (res) => {
                dbMethods.removeOne(roomModel, { _id: roomId }).then(
                  res => {
                    broadcastAllRooms(socket);
                  },
                  errorHandler
                );
              },
              errorHandler);
          });
        },
        errorHandler
      );
    });
  });
}