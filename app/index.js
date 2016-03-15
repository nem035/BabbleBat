'use strict';

const { join: joinPaths } = require('path');

const setupDirectories   = require(joinPaths(__dirname, 'dir'));
const setupConfig        = require(joinPaths(__dirname, 'config'));
const setupDb            = require(joinPaths(__dirname, 'db'));
const setupSession       = require(joinPaths(__dirname, 'session'));
const setupAuth          = require(joinPaths(__dirname, 'auth'));
const setupLogger        = require(joinPaths(__dirname, 'logger'));
const setupHandlebars    = require(joinPaths(__dirname, 'handlebars'));
const setupSass          = require(joinPaths(__dirname, 'sass'));
const setupRoutes        = require(joinPaths(__dirname, 'routes'));
const setupErrorHandlers = require(joinPaths(__dirname, 'error-handlers'));

module.exports = function(app) {
  
  // extract process info
  const { env: { NODE_ENV } } = process;
  
  // setup app directory names for easier accessibility
  setupDirectories(app);
  
  // setup environment variables
  const ENV = NODE_ENV || 'development';
  app.set('env', ENV);
  app.set('isProduction', ENV === 'production');
  app.set('isDevelopment', ENV === 'development');
  
  // setup the config based on the environment
  const config = setupConfig(app);  
  
  // setup the database, session and authentication
  const db = setupDb(app);
  const session = setupSession(app, db.Mongoose.connection);
  setupAuth(app, config, db);
  
  // setup logging
  setupLogger(app);
  
  // setup static assets
  setupHandlebars(app);
  setupSass(app);
  
  // setup routes
  setupRoutes(app);
  
  // setup error handling
  setupErrorHandlers(app);
  
  // TODO:
  return {
    db,
    session
  };
}