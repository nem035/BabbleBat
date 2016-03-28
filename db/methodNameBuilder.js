'use strict';

const _ = require('lodash');

module.exports = (modelName, suffix) => {
  return _.camelCase(`${modelName} ${suffix}`);
}