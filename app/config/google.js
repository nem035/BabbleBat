'use strict';

const _ = require('lodash');

module.exports = function(configEnv) {

  // obtain google config from the environment config
  const { google: googleConfigEnv } = configEnv;
  
  // obtain google config from the process config
  const {
    googleClientID,
    googleClientSecret,
    HOST
  } = process;
  
  let googleCallbackURL;
  if (HOST) {
    googleCallbackURL = `${HOST}/auth/google/callback`;
  }

  const googleConfigProcess = {
    clientID     : googleClientID,
    clientSecret : googleClientSecret,
    callbackURL  : googleCallbackURL
  };

  // merge the two configs with the process config having precedences
  const googleConfig = {};
  _.merge(googleConfig, googleConfigEnv, googleConfigProcess);
  
  return googleConfig;
};