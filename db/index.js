'use strict';

const _ = require('lodash');

const { join: joinPaths } = require('path');
const modelNames = require(joinPaths(__dirname, 'modelNames'));
const addCustom = require(joinPaths(__dirname, 'addCustom'));

module.exports = function(app) {
  
  const dbUri = app.get('dbUri');
  const Mongoose = require('mongoose').connect(dbUri);
  
  Mongoose.connection.on('error', error => {
    console.log('MongoDB Error: ', error);
  });
  
  // obtain all schemas
  const schemas = require(joinPaths(__dirname, 'schemas'))(app, Mongoose);
  
  // create a model for each schema
  const models = [];
  _.forEach(schemas, (schema, modelName) => {
    models.push(Mongoose.model(modelName, schema));
  });
  
  const coreMethodNames = require(joinPaths(__dirname, 'coreMethodNames'));
  const modelMethodNames = require(joinPaths(__dirname, 'modelMethodNames'));
  const methodNameBuilder = require(joinPaths(__dirname, 'methodNameBuilder'));
  
  // obtain database methods
  const methods = require(joinPaths(__dirname, 'methods'))(
    models, coreMethodNames, modelMethodNames, methodNameBuilder);

  // add custom methods
  addCustom(methods, models);
  
  return {
    Mongoose,
    methods
  };
};