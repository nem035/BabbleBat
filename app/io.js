'use strict';

module.exports = function(app, db, session) {
  
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  
  io.use((socket, next) => {
    // fetch the active user session
    // and add it to the socket
    session(socket.request, {}, next);
  });
  
  // TODO: improve this to not use local memory
  app.locals.rooms = [];
  
  require(app.get('IO_DIR'))(app, db, io);
  
  return server;
  
}