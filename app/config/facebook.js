'use strict';

const _ = require('lodash');

module.exports = function(configEnv) {

  // obtain facebook config from the environment config
  const { facebook: fbConfigEnv } = configEnv;
  
  // obtain facebook config from the process config
  const {
    fbClientID,
    fbClientSecret,
    HOST
  } = process;
  
  let fbCallbackURL;
  if (HOST) {
    fbCallbackURL = `${HOST}/auth/facebook/callback`;
  }

  const fbConfigProcess = {
    clientID     : fbClientID,
    clientSecret : fbClientSecret,
    callbackURL  : fbCallbackURL
  };

  // merge the two configs with the process config having precedences
  const fbConfig = {};
  _.merge(fbConfig, fbConfigEnv, fbConfigProcess);
  
  return fbConfig;
};