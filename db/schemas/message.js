'use strict';

module.exports = function(Mongoose, options) {
  const schema = {
    user: {
      id: String,
      name: String,
      avatar: String
    },
    room    : String,
    content : String,
    created : Date,
  };
  
  return new Mongoose.Schema(schema, options);
};