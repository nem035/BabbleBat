'use strict';

module.exports = function(model, query) {
  return new Promise((resolve, reject) => {
    model.find(query, (error, record) => {
      if (error) {
        reject(error);
      } else {
        resolve(record);
      }
    })
  });
};