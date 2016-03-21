'use strict';

const { join: joinPaths } = require('path');

module.exports = function(app, db, io) {

  const moduleNames = ['profile', 'rooms'];
  
  moduleNames.forEach(m => {
    require(joinPaths(__dirname, m))(db, io);
  });
};