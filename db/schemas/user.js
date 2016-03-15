'use strict';

const authProviders = ['facebook', 'twitter'];

module.exports = function(Mongoose) {
  const schema = {
    name   : String,
    avatar : String,
    email  : String
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