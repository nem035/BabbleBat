'use strict';

const redis = require('redis').createClient;
const adapter = require('socket.io-redis');

module.exports = function(app, db, session) {
  
  const server = require('http').Server(app);
  const io = require('socket.io')(server);
  
  // setup socket.io to only use web-sockets without polling
  io.set('transports', ['websocket']);

  // setup redis
  const { 
    host     : redisHost, 
    port     : redisPort,
    password : redisPassword
  } = app.get('redis');
  
  const pubClient = redis(redisPort, redisHost, {
    auth_pass: redisPassword
  });
  
  const subClient = redis(redisPort, redisHost, {
    return_buffers : true, // returns data in original state, without stringifying it
    auth_pass      : redisPassword
  });
  
  io.adapter(adapter({
    pubClient,
    subClient
  }));
  
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