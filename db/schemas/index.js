'use strict';

const { join: joinPaths } = require('path');

module.exports = function(app, Mongoose) {
  
  const modelNames = require(joinPaths(app.get('DB_DIR'), 'modelNames'));
  const models = {};
  
  modelNames.forEach(name => {    
    const schema = require(joinPaths(__dirname, name));
    models[name] = schema(Mongoose, { timestamps: true });
  })
  
  return models;
}