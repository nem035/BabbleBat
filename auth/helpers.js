'use strict';

const passport = require('passport');
const _ = require('lodash');
const { join : joinPaths } = require('path');
const authProviders = require(joinPaths(__dirname, 'providers'));

const buildFindQuery = (provider, { id, email }) => {

  const matches = [];

  const providerMatch = {};
  providerMatch[`${provider}.id`] = id;

  const emailMatches = [];
  _.forEach(authProviders, (p) => {
    const match = {};
    match[`${p}.email`] = email;
    emailMatches.push(match);
  });
    
  return { 
    $or: [...emailMatches, providerMatch]
  };
};

// first time when the user is created
const buildCreateQuery = (provider, data) => {
  let { name, avatar, email } = data;
  if (provider === 'twitter') {
    avatar = avatar.replace(/_normal/, '');
  }
  
  const createQuery = { name, avatar, email };
  createQuery[provider] = data;
  return createQuery;
}

const setupSocialStrategy = (app, config, authProcessorCb) => {
  const socialCfgs = _.pick(config, authProviders);
  
  _.forEach(socialCfgs, (cfg, name) => {
    const Strategy = require(`passport-${name}`).Strategy;
    passport.use(new Strategy(cfg, authProcessorCb));
  });
  
  app.set('authProviders', authProviders);
}

const isNonEmptyArray = x => _.isArray(x) && x.length > 0;

const extractFirstItemValue = (arr) => {
  if (isNonEmptyArray(arr) && _.isPlainObject(arr[0]) && _.isString(arr[0].value)) {
    return arr[0].value;
  }
  return '';
};

module.exports = {
  buildFindQuery,
  buildCreateQuery,
  setupSocialStrategy,
  extractFirstItemValue
};