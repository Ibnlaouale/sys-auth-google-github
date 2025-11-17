require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

const app = express();

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// CONNECT DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

// SESSION
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')();

// ROUTES
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// RUN SERVER
app.listen(process.env.PORT, () =>
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`)
);
