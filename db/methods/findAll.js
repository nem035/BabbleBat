'use strict';

module.exports = function(model, id) {
  return new Promise((resolve, reject) => {
    model.find({}, (error, record) => {
      if (error) {
        reject(error);
      } else {
        resolve(record);
      }
    })
  });
};