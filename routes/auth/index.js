'use strict';

const _ = require('lodash');
const { join: joinPaths } = require('path');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

const authRoutes = ['profile', 'rooms', 'room'];

module.exports = function(app, db, router) {
  
  authRoutes.forEach(routeName => {
    let routeFunc = require(joinPaths(__dirname, routeName));
    let routeMap = routeFunc(app, db);
   
    // iterates on the current routeMap object
    // obtaining handlers for each HTTP method
    // and adds that method to the routesMap
    _.forEach(routeMap, (data, method) => {
      const { path, handlers } = data;
      
      // create an array of middleware where authentication is done 
      // before anything else
      const authHandlers = [ensureAuthenticated, ...handlers];
      router[method](path, authHandlers);
    });
  });
  
  const socialAuthFunc = require(joinPaths(__dirname, 'social'));
  const socialAuthMap = socialAuthFunc(app.get('authProviders'));
  
  // TODO: separate social auth into individual files
  _.forEach(socialAuthMap, (routeHandler, socialAuthPath) => {
    router.get(socialAuthPath, routeHandler);
  });
};