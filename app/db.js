'use strict';

module.exports = (app) => require(app.get('DB_DIR'))(app);