'use strict';

const passport = require('passport');

const callbackRoutes = {
  successRedirect : '/rooms',
  failureRedirect : '/login'
};

const authObj = {
  facebook : { scope: ['email', 'public_profile']},
  twitter  : { scope: ['email', 'public_profile']}
};

module.exports = function(authProviders) {
  
  const map = {};
  authProviders.forEach(p => {
    map[`/auth/${p}`] = passport.authenticate(p, authObj[p]);
    map[`/auth/${p}/callback`] = passport.authenticate(p, callbackRoutes);
  });
  
  return map;
}