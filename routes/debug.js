'use strict';

module.exports = function(app) {
  const router = app.get('router');
  
  router.get('/debug', (req, res, next) => {
    res.render('debug');
  })
};