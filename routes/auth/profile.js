'use strict';

module.exports = function(app, db) {
  
  const profileRouteHandler = 
    (req, res, next) => {
      res.render('profile', {
        user      : req.user,
        socketUrl : `${app.get('hostUrl')}/profile`
      });
  };
  
  return {
    'get': {
      path    : '/profile',
      handlers : [ profileRouteHandler ]
    }
  };
}