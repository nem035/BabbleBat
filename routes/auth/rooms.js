'use strict';

module.exports = function(app, db) {
  
  const {
    methods : {
     roomFindAll 
    }
  } = db;
  
  const roomFindAllMiddleware = (req, res, next) => {
    roomFindAll().then(
      (rooms) => {
        req.rooms = rooms;
        next();
      },
      (err) => {
        res.redirect('/');
      }
    );
  };
  
  const socketUrl = `${app.get('hostUrl')}/rooms`;
  
  const roomsRouteHandler = (req, res, next) => {
          
    const { user, rooms } = req;
    
    res.render('rooms', {
      user,
      rooms,
      socketUrl
    });
  }
  
  return {
    'get': {
      path    : '/rooms', 
      handlers : [ roomFindAllMiddleware, roomsRouteHandler ]
    }
  };
}

