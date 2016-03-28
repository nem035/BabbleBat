'use strict';

module.exports = function(model, query, updates) {
  
  const sort = [['_id',1]];
  const options = { new:true };
  
  return new Promise((resolve, reject) => {
    model.findAndModify(query, sort, updates, options, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.value);
      }
    });
  });
}