'use strict';

module.exports = function(model, coreMethods) {
  return () => {
    return coreMethods.findAll(model);
  }
}