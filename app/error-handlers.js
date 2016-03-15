'use strict';

module.exports = function(app) {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    
    const {
      name, message
    } = err;
    
      res.status(500);
      res.render('error', { message });
    
  });
}