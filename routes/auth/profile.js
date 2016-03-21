'use strict';

module.exports = function(app, ensureAuthenticated) {
  
  return {
    'get': {
      path    : '/profile',
      handler : [
        ensureAuthenticated,
        (req, res, next) => {
          res.render('profile', {
            user      : req.user,
            socketUrl : `${app.get('hostUrl')}/profile`
          });
        }
      ]
    }
  };
}