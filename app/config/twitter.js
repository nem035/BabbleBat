'use strict';

const _ = require('lodash');

module.exports = function(configEnv) {

  // obtain twitter config from the environment config
  const { twitter: twitterConfigEnv } = configEnv;
  
  // obtain twitter config from the process config
  const {
    twitterClientID,
    twitterClientSecret,
    HOST
  } = process;
  
  let twitterCallbackURL;
  if (HOST) {
    twitterCallbackURL = `${HOST}/auth/facebook/callback`;
  }

  const twitterConfigProcess = {
    clientID     : twitterClientID,
    clientSecret : twitterClientSecret,
    callbackURL  : twitterCallbackURL
  };

  // merge the two configs with the process config having precedences
  const twitterConfig = {};
  _.merge(twitterConfig, twitterConfigEnv, twitterConfigProcess);
  
  return twitterConfig;
};