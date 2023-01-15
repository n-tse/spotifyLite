const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();
const path = require('path'); // path module allows us to work with directories and file paths
const Song = require('./models/Song');
const User = require('./models/User');
const routes = require('./routes');

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/spotifyLite");

// Configuring .env
require("dotenv").config({ path: path.join(__dirname, '../.env') });

// Applying middleware
app.use('/', express.json()); // parse requests with JSON payload/body
app.use('/public', express.static(path.join(__dirname, '/public'))); // serve static files. tells express app that all static files are in public directory. If we don't have this, express won't know where to look for css, images, scripts files

// Template engine configuration
app.set("views", path.join(__dirname, "/views")); // where template files are located. tells express app that HTML/EJS files aka 'views' are in the views folder
app.set("view engine", "ejs"); // default engine, dont need to specify .ejs extension. EJS is a view engine. Let's us generate HTML code in a different way

app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
  secret: "Rusty is a dog",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Importing other routes
app.use('/user', routes.UserRouter);
app.use('/song', routes.SongRouter);
app.use('/artist', routes.ArtistRouter);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// app.get('/', (req, res) => { res.json("Hello"); }); // we make a request to the homepage, and the server displays hello to the browser

app.get('/', (req, res) => {
  res.render('login')
});

app.get('/allSongs', isLoggedIn, (req, res) => {
  Song.find({}, function(err, songs) {
    res.render('allSongs', {
      songsList: songs
    })
  })
});

app.get("/register", function (req, res) {
  res.render("register");
});

// Handling user signup
app.post("/register", function (req, res) {
  var username = req.body.username
  var password = req.body.password
  User.register(new User({ username: username }),
          password, function (err, user) {
      if (err) {
          console.log(err);
          return res.render("register");
      }

      passport.authenticate("local")(
          req, res, function () {
          res.render("allSongs");
      });
  });
});

//Showing login form
app.get("/login", function (req, res) {
  res.render("login");
});

//Handling user login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/allSongs",
  failureRedirect: "/login"
}), function (req, res) {
});

//Handling user logout
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// Catch-all route for unsupported paths
app.all('*', (req, res) => {
  res.status(400).json({ error: "InvalidURI", description: `The URI ${req.url} is not valid.` });
});

module.exports = app;