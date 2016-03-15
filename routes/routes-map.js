'use strict';

const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  'get': {
    '/': (req, res, next) => {
      res.redirect('/login')
    },
    '/profile': [isAuthenticated, (req, res, next) => {
      res.render('profile', {
        user: req.user
      });
    }],
    '/login': (req, res, next) => {
      if (req.isAuthenticated()) {
        res.redirect('/profile');
      } else {
        res.render('login');
      }
    },
    '/logout': (req, res, next) => {
      req.logout();
      res.redirect('/login');
    },
    // auth
    '/auth/facebook': passport.authenticate('facebook', {
				scope: ['email', 'public_profile']
			}),
    '/auth/facebook/callback': passport.authenticate('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/login'
    }),
    '/auth/twitter': passport.authenticate('twitter', {
				scope: ['email', 'public_profile']
			}),
    '/auth/twitter/callback': passport.authenticate('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/login'
    })
  },
  'post': {
    
  },
  '404': (req, res, next) => {
    res.status(404);
    res.render('404');
  }
};