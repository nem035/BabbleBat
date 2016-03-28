'use strict';
const { join: joinPaths } = require('path');

const regularRoutes = ['home', 'login', 'logout'];
const authRoutes    = ['profile'];

module.exports = function(app, db, router) {
  
  regularRoutes.forEach(routeName => {
    const { path, handler } = require(joinPaths(__dirname, routeName));
    router.get(path, handler);
  });
  
  // register auth routes
  require(joinPaths(__dirname, 'auth'))(app, db, router);
  
  // error handler (404) route
  router.use((req, res, next) => {
    res.status(404);
    res.render('404');
  });
  
};