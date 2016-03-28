'use strict';

const { join: joinPaths } = require('path');

module.exports = function(app, Mongoose) {
  
  const modelNames = require(joinPaths(app.get('DB_DIR'), 'modelNames'));
  const schemas = {};
  
  modelNames.forEach(name => {    
    schemas[name] = require(joinPaths(__dirname, name))(Mongoose);;
  })
  
  return schemas;
}