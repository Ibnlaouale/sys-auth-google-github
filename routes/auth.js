const express = require('express');
const passport = require('passport');
const router = express.Router();

// LOCAL LOGIN
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
}), (req, res) => {
  res.redirect('/profile');
});

// LOCAL REGISTER
router.post('/register', async (req, res) => {
  const User = require('../models/User');

  try {
    const user = new User({ username: req.body.username });
    await User.register(user, req.body.password);
    passport.authenticate('local')(req, res, () => {
      res.redirect('/profile');
    });
  } catch (err) {
    res.send(err);
  }
});

// GOOGLE
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/profile')
);

// GITHUB
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/profile')
);

// LOGOUT
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
