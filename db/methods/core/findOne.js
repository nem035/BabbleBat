'use strict';

module.exports = function(model, options) {
  return model.findOne(options);
};