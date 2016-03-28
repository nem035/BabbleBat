'use strict';

module.exports = function(model, coreMethods) {
  return (data) => {
    return coreMethods.createOne(model, data);
  };
}