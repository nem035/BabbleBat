'use strict';

const { join: joinPaths } = require('path');

module.exports = function(Mongoose) {
  
  return {
    user: require(joinPaths(__dirname, 'user'))(Mongoose)
  };
}