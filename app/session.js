'use strict';

module.exports = (app) => {
  app.use(
    require(app.get('SESSION_DIR'))(app)
  );
};