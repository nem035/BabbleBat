'use strict';

module.exports = {
  
  getUserId: (socket) => {
    const { passport } = socket.request.session;
    return passport ? passport.user : null;
  },
  
  splitRooms: (userId, rooms) => {
              
    // split rooms into categories 
    
    const createdRooms = [], 
          joinedRooms = [],
          publicRooms = [];  
          
    rooms.forEach(
      room => {
        const hasCreated = room.owner === userId;
        const hasJoined = !hasCreated && 
                          room.users.indexOf(userId) !== -1;
        
        if (hasCreated) {
          createdRooms.push(room);
        } else if (hasJoined) {
          joinedRooms.push(room);
        } else {
          publicRooms.push(room);
        }
      }
    );
    
    return {
      createdRooms,
      joinedRooms,
      publicRooms
    };
  },
  
  joinRoom: (socket, user, room, users, messages) => {
    
    const { 
      id : roomId,
      connections
    } = room;
    
    socket.join(roomId);
    
    // cache the current roomId so we can use it when disconnecting
    socket.roomId = roomId;
    
    // notify to all sockets (except the originating one) 
    // that a user joined
    socket.to(roomId).emit('userJoinedRoom', {
      user,
      connections
    });
    
    // notify the joined user that he joined the room successfully
    socket.emit('resJoinRoom', {
      users,
      connections,
      messages
    });
  }
  
}