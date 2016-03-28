'use strict';

module.exports = function(model, conditions, update, options, callback) {

  options = options || { new: true };
  
  return new Promise((resolve, reject) => {
    model.findOneAndUpdate(conditions, update, options, (err, record) => {
      if (err) {
        reject(err);
      } else {
        resolve(record);
      }
    });
  });
}