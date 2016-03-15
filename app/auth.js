'use strict';

const passport = require('passport');

module.exports = function(app, config, db) {
  require(app.get('AUTH_DIR'))(config, db);
  
  app.use(passport.initialize());
  app.use(passport.session());
}