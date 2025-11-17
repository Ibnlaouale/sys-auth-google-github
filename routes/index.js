const express = require('express');
const router = express.Router();

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/', (req, res) => {
  res.render("home");
});

router.get('/login', (req, res) => {
  res.render("login");
});

router.get('/profile', ensureAuth, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
