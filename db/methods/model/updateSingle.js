'use strict';

module.exports = function(model, coreMethods) {
  return (_id, updates) => {
    return coreMethods.updateOne(
      model, 
      { _id },
      updates
    );
  }
}