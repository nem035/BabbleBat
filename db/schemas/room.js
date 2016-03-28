'use strict';

module.exports = function(Mongoose) {
  const schema = {
    name        : String,
    users       : Array, // array of user ids
    connections : Array, // array of socket ids
    owner       : String
  };
  
  return new Mongoose.Schema(schema);
};