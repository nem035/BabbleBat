'use strict';

module.exports = function(model, coreMethods) {
  return (_id) => {
    return coreMethods.removeOne(model, { _id });
  };
}