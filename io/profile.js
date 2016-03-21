'use strict';

module.exports = function(db, io) {
    
  io.of('/profile').on('connection', socket => {
    console.log('Socket.io connected to rooms');
  });
  
}