'use strict';

// setup handlebars
const exphbs  = require('express-handlebars');

module.exports = function(app) {
  const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
  });
  
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');
}