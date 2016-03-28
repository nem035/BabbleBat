'use strict';

module.exports = function(app, db) {
  
  const {
    methods : {
      roomFindSingle
    }
  } = db;
  
  const roomFindSingleMiddleware = (req, res, next) => {
    
    const { id } = req.params;
    
    roomFindSingle(id).then(
      (room) => { 
        req.room = room;
        next();
      },
      (err) => { res.redirect('/rooms'); }
    );
  };
    
  const socketUrl = `${app.get('hostUrl')}/room`;
    
  const roomRouteHandler = (req, res, next) => {
    
    const { room, user } = req;
    
    // extract room info
    const {
      name : roomName,
      _id  : roomId
    } = room;
    
    // extract user info
    const {
      name   : userName, 
      _id    : userId,
      avatar : userAvatar
    } = user;
    
    res.render('room', {
      room, user, socketUrl 
    });
  }
    
  return {
    'get': {
      path    : '/rooms/:id', 
      handlers : [roomFindSingleMiddleware, roomRouteHandler]
    }
  };
}

