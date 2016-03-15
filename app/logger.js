'use strict';

const morgan              = require('morgan');
const fs                  = require('fs');
const FileStreamRotator   = require('file-stream-rotator');
const { join: joinPaths } = require('path');

module.exports = function(app) {
    
  const logDir = app.get('LOG_DIR');
    
  // ensure log directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // create a rotating write stream
  const accessLogStream = FileStreamRotator.getStream({
    date_format : 'YYYYMMDD',
    filename    : joinPaths(logDir, 'access-%DATE%.log'),
    frequency   : 'daily',
    verbose     : false
  });
  
  // setup the logger
  app.use(morgan('combined', { stream: accessLogStream }));
  
}