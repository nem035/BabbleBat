'use strict';

const passport = require('passport');
const { join : joinPaths } = require('path');

const {
  buildFindQuery,
  buildCreateQuery,
  setupSocialStrategy,
  extractFirstItemValue
} = require(joinPaths(__dirname, 'helpers'));

module.exports = function(app, config, db) {
  
  const {
    methods : {
      userFindSingle,
      userFindOrCreateSingle
    }
  } = db;
  
  // invoked when auth process ends
  // this creates a session with only the user id (this id is provided by Mongo)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // 
  passport.deserializeUser((id, done) => {
    // find the user using the mongo id
    userFindSingle(id).then(user => {
      done(null, user)
    })
    .catch(error => {
      console.log('Error when deserializing a user');
      console.log(error);
    });
  });
  
  // Find a user in the local db using profile.id
  // If the user is found, return the user data using the done()
  // Else, create a user in the local db and return it
  const authProcessorCallback = (accessToken, refreshToken, profile, done) => {
    
    const { 
      id, 
      displayName: name, 
      photos,
      emails,
      provider
    } = profile;
    
    const avatar = extractFirstItemValue(photos);
    const email = extractFirstItemValue(emails);
    
    const findQuery = buildFindQuery(provider, { 
      id, 
      email 
    });
    
    const createQuery = buildCreateQuery(provider, {
      id,
      name,
      avatar,
      email
    });
    
    // TODO: use findAndUpdateOrCreateOne
    // to properly sync login accross various accounts
    // using users email
    userFindOrCreateSingle(findQuery, createQuery)
    .then(user => {
      done(null, user);
    }).catch(error => {
      console.log('Error when finding or creating a user');
      console.log(error);
    });
  }
  
  setupSocialStrategy(app, config, authProcessorCallback);
}

