'use strict';

const session    = require('express-session');

// NOTE:
// Session data is not saved in the cookie itself, just the session ID. 
// Session data is stored server-side.
module.exports = function(app, dbConnection) {
  const MongoStore = require('connect-mongo')(session);

  const sessionSecret = app.get('sessionSecret');
  const isDevelopment = app.get('isDevelopment');
  const isProduction  = app.get('isProduction');
  
  const settings = {
    secret            : sessionSecret
  };
  
  // use our MongoDB connection as the session store
  // otherwise session defaults to MemoryStore (in Development mode)
  if (isProduction) {
    settings.store = new MongoStore({
      // make sure we only connect once to the same MongoDB instance
      mongooseConnection: dbConnection,
			stringify: true // make sure all session variables are first converted to strings and then stored in the DB
    });
  } else if (isDevelopment) {
    settings.resave = false;
    // Forces a session that is "uninitialized" to be saved to the store. 
    // A session is uninitialized when it is new but not modified. 
    settings.saveUninitialized = true;
  }
  
  
  return session(settings);
}