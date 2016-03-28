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
  }
}