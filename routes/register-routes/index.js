'use strict';

const _ = require('lodash');

module.exports = function(app, router, routes) {
  const registerRoutes = (routes, method) => {
    
    _.forEach(routes, function(val, key) {
      if (_.isPlainObject(val)) {
        registerRoutes(val, key);
      } else if (_.isString(method)) {
        router[method](key, routes[key]);
      } 
    });    
  };

  registerRoutes(routes);

}