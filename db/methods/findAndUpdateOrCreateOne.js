'use strict';

const { join: joinPaths } = require('path');

const findOne         = require(joinPaths(__dirname, 'findOne'));
const createOne       = require(joinPaths(__dirname, 'createOne'));
const updateOne       = require(joinPaths(__dirname, 'updateOne'));

const { flattenObject } = require(joinPaths(process.cwd(), 'utils'));

// TODO:
module.exports = function(model, findOptions, createOptions) {
  return new Promise((resolve, reject) => {
    findOne(model, findOptions)
    .then((record) => {
      
      if (record) {
        const updateOptions = flattenObject(createOptions);
      
        // TODO: this update should be recursive
        // and handle nested objects by individual properties
        require('lodash').forEach(createOptions, (val, key) => {
          if (val) {
            record[key] = val;
          }
        });
        record.save((err, updatedRecord) => {
          if (err) {
            reject(err);
          } else {
            resolve(updatedRecord);
          }
        });
      
        // return updateOne(
        //   model, 
        //   { id: record.id },
        //   updateOptions
        // ).then(numAffected => {
        //   return findOne(model, findOptions);
        // }, reject);
        
      } else {
        createOne(model, createOptions).then(resolve, reject);
      }
    });
  });
}