const Song = require("../models/Song");

exports.get_showAllSongs = async (req, res) => {
  try {
    // get data from database
    // const song = await Song.find(); // takes contents of objects and populates it
    const song = await Song.find().populate("title"); // takes contents of objects and populates it
    console.log("songs", song);
    res.json(song);
  } catch (e) {
    console.error(e);
  }
};

// put request to that song for when you want to like a song
exports.put_addLikedSong = async (req, res) => {
  try {
    // have to have some separate song not already in user's 'likedSongs' array that we can add
    // maybe add id for songs to identify which song to add to the likedSongs array
  } catch(e) {
    console.log("error:", e);
  }
}
