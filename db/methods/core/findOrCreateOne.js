'use strict';

const { join: joinPaths } = require('path');
const findOne = require(joinPaths(__dirname, 'findOne'));
const createOne = require(joinPaths(__dirname, 'createOne'));

module.exports = function(model, findOptions, createOptions) {
  return new Promise((resolve, reject) => {
    findOne(model, findOptions)
      .then((record) => {
        if (record) {
          resolve(record);
        } else {
          createOne(model, createOptions).then(resolve, reject);
        }
      });
  });
}