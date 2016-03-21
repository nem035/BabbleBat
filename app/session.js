'use strict';

module.exports = (app, dbConnection) => {
  const session = require(app.get('SESSION_DIR'))(app, dbConnection);
  app.use(session);
  return session;
};