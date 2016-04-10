'use strict';

module.exports = function(Mongoose, options) {
  const schema = {
    name        : String,
    users       : Array, // array of user ids
    connections : Array, // array of socket ids
    owner       : String
  };
  
  return new Mongoose.Schema(schema, options);
};