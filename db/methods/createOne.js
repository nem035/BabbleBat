'use strict';

module.exports = function(model, options) {
  return new Promise((resolve, reject) => {
    
    const instance = new model(options);
    
    return instance.save(error => {
      if (error) {
        reject(error);
      } else {
        resolve(instance);
      }
    });
  });
};