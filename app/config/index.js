'use strict';

const _ = require('lodash');
const { join: joinPaths } = require('path');

module.exports = function(app) {
  
  const { env: processEnv } = process;
  const authProviders = require(joinPaths(app.get('AUTH_DIR'), 'providers'));
 
  // obtain the environment config from the process and the config directory
  const configEnv = require(app.get('CONFIG_DIR'))(app.get('env'));
  const configProcess  = _.pick(processEnv, [
    'APP_TITLE', 
    'PORT', 
    'HOST', 
    'DB_URI',
    'SESSION_SECRET'
  ]);
  
  // merge the two configs, with the process config having precedence
  const config = {};
  _.merge(config, configEnv, configProcess);
  
  
  // setup social config
  authProviders.forEach(p => {
    config[p] = require(joinPaths(__dirname, p))(configEnv);
  });
  
  const {
    APP_TITLE,
    PORT,
    HOST,
    DB_URI,
    SESSION_SECRET
  } = config;
  
  app.locals.appTitle = APP_TITLE;
  app.set('port', PORT);
  app.set('host', HOST);
  app.set('hostUrl', `${HOST}:${PORT}`);
  app.set('dbUri', DB_URI);
  app.set('sessionSecret', SESSION_SECRET);
  
  return config;
};