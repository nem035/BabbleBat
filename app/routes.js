'use strict';

const express = require('express');

module.exports = function(app, db) {
  
  const router = express.Router();
  
  require(app.get('ROUTES_DIR'))(app, db, router);
  
  app.use('/', router);
  
  return router;
};