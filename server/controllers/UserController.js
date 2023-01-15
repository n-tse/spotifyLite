const { findById } = require("../models/User");
const User = require("../models/User");

exports.get_userLikedSongs = async (req, res) => {
  try {
    // get data from database
    const user = await User.findOne().populate("likedSongs"); // takes contents of objects and populates it
    console.log("users", user);
    res.json(user.likedSongs);
  } catch (e) {
    console.error(e);
  }
};
exports.get_userProfile = async (req, res) => {
  // res.json({ uid: req.params.uid });
  try {
    const user = await User.findById(req.params.uid);
    console.log(user);
    res.json(user);
  } catch(e) {
    console.log("error:", e);
  }
};
exports.post_postHello = async (req, res) => {
  // res.json({ uid: req.params.uid });
  try {
    res.json("hello"); //save to database
  } catch(e) {
    console.log("error:", e);
  }
};