'use strict';
const { join: joinPaths } = require('path');
const routesMap = require(joinPaths(__dirname, 'routes-map'));
const registerRoutes = require(joinPaths(__dirname, 'register-routes'));
const passport = require('passport');

module.exports = function(app, router) {
  
  registerRoutes(app, router, routesMap);
  
  // error handler route
  router.use(routesMap['404']);
};