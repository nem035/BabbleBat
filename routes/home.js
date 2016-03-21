'use strict';

module.exports = {
  path    : '/',
  handler : (req, res, next) => {
    res.redirect('/login');
  }
};