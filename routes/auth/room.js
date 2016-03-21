'use strict';

module.exports = function(app, ensureAuthenticated) {
  
  return {
    'get': {
      path    : '/rooms/:id', 
      handler : [
        ensureAuthenticated,
        (req, res, next) => {
          res.render('room', {
            user      : req.user,
            socketUrl : `${app.get('hostUrl')}/room/${roomId}`
          });
        }
      ]
    }
  };
}

