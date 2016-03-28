'use strict';

const _ = require('lodash');

module.exports = function(model, coreMethods) {
  return (query) => {
    if (_.isString(query)) {
      return coreMethods.findById(model, query);
    }
    return coreMethods.findOne(model, query);
  }
}