'use strict';

const authProviders = ['facebook', 'twitter'];

module.exports = function(Mongoose) {
  const schema = {
    name   : String,
    avatar : String,
    email  : String,
    rooms  : Array
  };
  authProviders.forEach(p => {
    schema[p] = {
      id     : String,
			name   : String,
			avatar : String,
			email  : String
    }
  });
  
  return new Mongoose.Schema(schema);
}