'use strict';

const express = require('express');

module.exports = function(app) {
  
  const router = express.Router();
  
  require(app.get('ROUTES_DIR'))(app, router);
  
  app.use('/', router);
  
  return router;
};