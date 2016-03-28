'use strict';

module.exports = function(model, coreMethods) {
  return (findQuery, createQuery) => {
    return coreMethods.findOrCreateOne(model, findQuery, createQuery);
  }
}