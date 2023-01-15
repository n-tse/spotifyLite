const Song = require("../models/Song");

// put request to that song for when you want to like a song
exports.put_addLikedSong = async (req, res) => {
  try {
    // have to have some separate song not already in user's 'likedSongs' array that we can add
    // maybe add id for songs to identify which song to add to the likedSongs array
  } catch(e) {
    console.log("error:", e);
  }
}
