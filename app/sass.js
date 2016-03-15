'use strict';

// setup sass
const sass                      = require('node-sass-middleware');
const { static : staticAssets } = require('express');
const { join   : joinPaths }    = require('path');

module.exports = function(app) {
  
  const isDevelopment = app.get('isDevelopment');
  app.use('/stylesheets', sass({
    src         : app.get('SASS_DIR'),
    dest        : app.get('STYLESHEETS_DIR'),
    debug       : isDevelopment,
    request     : false,
    outputStyle : isDevelopment ? 'extended' : 'compressed'
  }));
  app.use(staticAssets(app.get('STATIC_DIR')));
};