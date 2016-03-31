'use strict';


const { join: joinPaths } = require('path');
const { getUserId, joinRoom } = require(joinPaths(__dirname, 'helpers'));

module.exports = function(db, io) {

  const {
    methods : {
      linkAndConnectUserAndRoom,
      disconnectUserAndRoom,
      roomFindAllUsersAndMessages,
      messageCreateSingle
    }
  } = db;
  
  const errorHandler = (err) => {
    console.log(err);
  }
  
  io.of('/room').on('connection', socket => {
    
    const userId = getUserId(socket);
    const { id: socketId } = socket;
        
    socket.on('disconnect', () => {
      const { roomId } = socket;
      
			disconnectUserAndRoom(userId, roomId, socketId).then(
        ([room, user]) => {
          
          socket.leave(roomId);
          
          // clear the roomId
          delete socket.roomId;
          
          // notify to all sockets (except the originating one) 
          // that a user left
          socket.to(roomId).emit('userLeftRoom', {
            user
          });
        }, errorHandler);
		});
    
    socket.on('reqJoinRoom', roomId => {
      
      linkAndConnectUserAndRoom(userId, roomId, socketId)
        .then(([room, user]) => {
          roomFindAllUsersAndMessages(roomId).then(
            ([users, messages]) => {
              joinRoom(socket, user, room, users, messages);
            }
          );
        }).catch(errorHandler);
        
    });
    
    socket.on('sendMessage', ({user, roomId, content }) => {
      
      const id = getUserId(socket);
      const { name, avatar } = user; 
      
      const owner = getUserId(socket);
      messageCreateSingle({
        user: {
         id,
         name,
         avatar
        },
        room: roomId,
        content
      }).then(message => {
        socket.to(roomId).emit('receiveMessage', { message });
      }).catch(errorHandler);
      
    });
    
  });
}