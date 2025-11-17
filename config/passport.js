const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

module.exports = function () {

  passport.use(User.createStrategy());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  // GOOGLE
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`
  }, async (accessToken, refreshToken, profile, done) => {

    const email = profile.emails[0].value;

    User.findOrCreate(
      { googleId: profile.id },
      {
        username: email,
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value,
      },
      (err, user) => done(err, user)
    );
  }));

  // GITHUB
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/github/callback`
  }, async (accessToken, refreshToken, profile, done) => {

    User.findOrCreate(
      { githubId: profile.id },
      {
        username: profile.username,
        name: profile.displayName || profile.username,
        avatar: profile.photos?.[0]?.value,
      },
      (err, user) => done(err, user)
    );
  }));

};
