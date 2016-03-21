'use strict';

module.exports = {
  path    : '/logout',
  handler : (req, res, next) => {
    req.logout();
    res.redirect('/login');
  }
};