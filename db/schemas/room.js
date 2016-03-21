'use strict';

module.exports = function(Mongoose) {
  const schema = {
    name   : String,
    users  : Array,
    owner  : String
  };
  
  return new Mongoose.Schema(schema);
};