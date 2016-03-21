'use strict';

// setup sass
const sass                      = require('node-sass-middleware');

module.exports = function(app) {
  
  const isDevelopment = app.get('isDevelopment');
  app.use('/stylesheets', sass({
    src         : app.get('SASS_DIR'),
    dest        : app.get('STYLESHEETS_DIR'),
    debug       : isDevelopment,
    request     : false,
    outputStyle : isDevelopment ? 'extended' : 'compressed'
  }));
};