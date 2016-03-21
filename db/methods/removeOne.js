'use strict';

module.exports = function(model, query) {
  return new Promise((resolve, reject) => {
        
    return model.remove(query, (error, res) => {
      if (error) {
        reject(error);
      } else {
        resolve(res);
      }
    });
  });
};