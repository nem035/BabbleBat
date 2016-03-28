'use strict';

module.exports = function(model, coreMethods) {
  return (query) => {
    return coreMethods.find(model, query);
  };
}