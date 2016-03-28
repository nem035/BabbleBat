'use strict';

module.exports = function(model, coreMethods) {
  return (query, updates) => {
    return coreMethods.findOneAndUpdate(model, query, updates);
  };
}