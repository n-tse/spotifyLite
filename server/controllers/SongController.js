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
exports.post_addLikedSong = async (req, res) => {
  try {
    console.log(req.body);
  } catch(e) {
    console.log("error:", e);
  }
}
