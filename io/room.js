'use strict';


const { join: joinPaths } = require('path');
const { getUserId } = require(joinPaths(__dirname, 'helpers'));

module.exports = function(db, io) {

  const {
    methods : {
      linkAndConnectUserAndRoom,
      disconnectUserAndRoom,
      userFindAllInRoom
    }
  } = db;
  
  const errorHandler = (err) => {
    console.log(err);
  }
  
  const joinRoom = (socket, user, users, room) => {
    
    const { 
      id : roomId,
      connections
    } = room;
    
    socket.join(roomId);
    
    // cache the current roomId so we can use it when disconnecting
    socket.roomId = roomId;
    
    // notify to all sockets (except the originating one) 
    // that a user joined
    socket.broadcast.to(roomId).emit('userJoinedRoom', {
      user,
      connections
    });
    
    // notify the joined user that he joined the room successfully
    socket.emit('resJoinRoom', {
      users,
      connections
    });
  }
  
  io.of('/room').on('connection', socket => {
    
    const userId = getUserId(socket);
    const { id: socketId } = socket;
        
    socket.on('disconnect', () => {
      const { roomId } = socket;
      
			disconnectUserAndRoom(userId, roomId, socketId).then(
        ([room, user]) => {
          
          // clear the roomId
          delete socket.roomId;
          
          // notify to all sockets (except the originating one) 
          // that a user left
          socket.broadcast.to(roomId).emit('userLeftRoom', {
            user
          });
        }, errorHandler);
		});
    
    socket.on('reqJoinRoom', roomId => {
      
      // Links the relationship between the user and the room (if not present already)
      // and adds the current socket connection link between them.
      // Then finds all users in the room and signals all chat
      // participants that a new user joined
      linkAndConnectUserAndRoom(userId, roomId, socketId)
        .then(([room, user]) => {
          userFindAllInRoom(roomId).then(
            (users) => {
              joinRoom(socket, user, users, room);
            }
          );
        }).catch(errorHandler);
        
    });
    
  });
}