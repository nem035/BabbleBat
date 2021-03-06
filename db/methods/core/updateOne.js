'use strict';

module.exports = function(model, condition, update, options) {
  options = options || {};
  return new Promise((resolve, reject) => {
    model.update(condition, update, options, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}