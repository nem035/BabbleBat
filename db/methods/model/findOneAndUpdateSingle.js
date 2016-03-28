'use strict';

module.exports = function(model, coreMethods) {
  return (_id, updates) => {
    return coreMethods.findOneAndUpdate(model, { _id }, updates);
  };
}