const mongoose = require('mongoose'); // import mongoose library so we can create schemas
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
mongoose.set('strictQuery', true);

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true},
  likedSongs: [{ type: refType, ref: "Song" }], // liked songs is an array of song references
  followedArtists: [{ type: refType, ref: "Artist" }]
});

const User = mongoose.model("User", UserSchema, "User");

module.exports = User;
