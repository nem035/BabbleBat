'use strict';

const { join: joinPaths } = require('path');
const _ = require('lodash');

module.exports = function(app) {
  
  const dbUri = app.get('dbUri');
  const Mongoose = require('mongoose').connect(dbUri);
  
  Mongoose.connection.on('error', error => {
    console.log('MongoDB Error: ', error);
  });
  
  // obtain all schemas
  const schemas = require(joinPaths(__dirname, 'schemas'))(Mongoose);
  
  // create a model for each schema
  const models = {};
  _.forEach(schemas, (schema, modelName) => {
    models[modelName] = Mongoose.model(modelName, schema);
  });
  
  // obtain database methods
  const methods = require(joinPaths(__dirname, 'methods'));

  return {
    Mongoose,
    models,
    methods
  };
};