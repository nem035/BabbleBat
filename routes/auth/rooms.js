'use strict';

module.exports = function(app, ensureAuthenticated) {
  
  return {
    'get': {
      path    : '/rooms', 
      handler : [
        ensureAuthenticated,
        (req, res, next) => {
          res.render('rooms', {
            user      : req.user,
            rooms     : app.locals.rooms,
            socketUrl : `${app.get('hostUrl')}/rooms`
          });
        }
      ]
    }
  };
}

