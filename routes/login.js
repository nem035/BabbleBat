'use strict';

module.exports = {
  path    : '/login',
  handler : (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/rooms');
    } else {
      res.render('login');
    }
  }
};