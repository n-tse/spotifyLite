const Song = require("../models/Song");
const User = require("../models/User");

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
  const idToFind = "63c36fd82a88d67c45b83e80";
  try {
    // console.log(req.body);
    let user1 = await User.findById(idToFind);
    // console.log("user1.likedSongs:", user1.likedSongs);

    let songToAdd = await Song.findById(req.body.songId);
    // console.log("songToAdd:", songToAdd);
    // console.log("usersLikedSongs:", user1.likedSongs);
    user1.likedSongs.push(songToAdd);
    // const userToUpdate = await User.findByIdAndUpdate('63c36fd82a88d67c45b83e80', { likedSongs: likedSongs.push(Song.findById(req.body))}, {new: true}); 
    // User.findOneAndUpdate({ _id: "63c36fd82a88d67c45b83e80"}, {likedSongs: userLikedSongs});
    // User.updateOne({ username: "user1" }, { $set: { likedSongs: usersLikedSongs}});
    // User.updateOne({ username: "user1" }, { likedSongs: user1.likedSongs}
    User.updateOne({ _id: idToFind }, { likedSongs: user1.likedSongs}, function (err, docs) {
      if (err){
        console.log(err);
      } else {
        console.log("updated docs : " , docs)
      }
    });
  } catch(e) {
    console.log("error:", e);
  }
}
