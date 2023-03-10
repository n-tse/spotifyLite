const express = require('express');
const app = express();
const path = require('path'); // path module allows us to work with directories and file paths
const Song = require('./models/Song');
const routes = require('./routes');
const userRoutes = require("./routes/UserRouter");

// Configuring .env
require("dotenv").config({ path: path.join(__dirname, '../.env') });

// Applying middleware
app.use('/', express.json()); // parse requests with JSON payload/body
app.use(express.urlencoded({
  extended: true
}));
app.use('/public', express.static(path.join(__dirname, '/public'))); // serve static files. tells express app that all static files are in public directory. If we don't have this, express won't know where to look for css, images, scripts files
app.use(userRoutes);

// Template engine configuration
app.set("views", path.join(__dirname, "/views")); // where template files are located. tells express app that HTML/EJS files aka 'views' are in the views folder
app.set("view engine", "ejs"); // default engine, dont need to specify .ejs extension. EJS is a view engine. Let's us generate HTML code in a different way

// Importing other routes
app.use('/user', routes.UserRouter);
app.use('/song', routes.SongRouter);
app.use('/artist', routes.ArtistRouter);

// app.get('/', (req, res) => { res.json("Hello"); }); // we make a request to the homepage, and the server displays hello to the browser

app.get('/login', (req, res) => {
  res.render('login')
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/allSongs', (req, res) => {
  Song.find({}, function(err, songs) {
    res.render('allSongs', {
      songsList: songs
    })
  })
});

// Catch-all route for unsupported paths
app.all('*', (req, res) => {
  res.status(400).json({ error: "InvalidURI", description: `The URI ${req.url} is not valid.` });
});

module.exports = app;