const path = require("path"); // path is a core module inside node. don't need to install explicitly. Path is a module that can be used in node. While we need to install express and nodemon, don't need to install path cuz it's already part of node
require('dotenv').config(path.join(__dirname, '../.env')); // .env is in different folder. basically, allows us to use .env file. __dirname is a global variable and gives us the current directory name we're in. allows us to share code without sharing our connection string, which contains senstive info
const mongoose = require('mongoose');
const { MONGO_URL } = process.env;

const User = require("../models/User"); // here we're requiring the schemas
const Song = require("../models/Song");
const Artist = require("../models/Artist");

// schema provides layout for the data.

async function run() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB.");

    let list = await mongoose.connection.db.collections();
    // console.log("list", list);

    // Resetting User
    // await Promise.all([User.collection.drop(), Song.collection.drop(), Artist.collection.drop()]);
    // clears everything in the schema since we're gonna populate with new data

    //---------------------------
    const collections = [Artist, Song, User];
        for (let model of collections) {
            let list = await model.db.db
                .listCollections({
                    name: model.collection.name,
                })
                .toArray();
            // console.log("check is list exist", list);
            if (list.length !== 0) {
                await model.collection.drop();
            }
        }
        // const dropResult = await Promise.all([
        //     User.collection.drop(),
        //     Artist.collection.drop(),
        //     Song.collection.drop(),
        // ]);
    //---------------------------

    // Create a user
    const createUser = await User.create({ username: "user1", email: "user1@email.com", password: "user1pw", likedSongs: [], followedArtists: [] });
    console.log("createUser =", createUser);
    // Create many Songs
    const likedSongs = [];
    for (let i = 1; i <= 5; i++) {
      likedSongs.push({ title: `Song${i}`, language: `Language${i}`, genre: `Genre${i}`});
    }
    const insertManySongs = await Song.insertMany(likedSongs); // insert all of song objects to song collection. Song is the name of the model. .insertMany is a mongoose method
    console.log("insertManySongs =", insertManySongs);
    const songIds = insertManySongs.map((song) => song._id); // id autogenerated by mongoDB

    // console.log(songIds);

    // Update the user reference to a list of song IDs
    const updatedUser = await User.findByIdAndUpdate(createUser._id, { likedSongs: songIds }, { new: true });
    console.log("updatedUser =", updatedUser);

    let newSongs = [];
    for (let i = 6; i <= 10; i++) {
      newSongs.push({ title: `Song${i}`, language: `Language${i}`, genre: `Genre${i}`});
    }

    const insertNewSongs = await Song.insertMany(newSongs);

  } catch (err) {
    console.log(err);
  } finally {
    await mongoose.connection.close(); // not really necessary. can omit
  }
}

run().catch(console.dir);
