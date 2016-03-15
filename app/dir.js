'use strict';

const { join: joinPaths } = require('path');

module.exports = function(app) {
  
  const HOME_DIR = process.cwd();
  
  // setup app directories as platform-agnostic strings
  app.set('HOME_DIR', HOME_DIR);
  app.set('CONFIG_DIR',  joinPaths(HOME_DIR, '_config'));
  app.set('DB_DIR', joinPaths(HOME_DIR, 'db'));
  app.set('SESSION_DIR',  joinPaths(HOME_DIR, 'session'));
  app.set('AUTH_DIR', joinPaths(HOME_DIR, 'auth'));
  app.set('LOG_DIR', joinPaths(HOME_DIR, '_logs'));
  app.set('STATIC_DIR', joinPaths(HOME_DIR, 'public'));
  app.set('SASS_DIR', joinPaths(HOME_DIR, 'sass'));
  app.set('STYLESHEETS_DIR', joinPaths(app.get('STATIC_DIR'), 'stylesheets'));
  app.set('ROUTES_DIR', joinPaths(HOME_DIR, 'routes'));
}