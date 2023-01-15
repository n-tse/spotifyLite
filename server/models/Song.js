const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
mongoose.set('strictQuery', true);

const SongSchema = new Schema({
  title: { type: String, required: true },
  language: { type: String, required: true },
  genre: { type: String, required: true },
  artist: [{ type: refType, ref: "Artist" }] 
});

const Song = mongoose.model("Song", SongSchema, "Song");

module.exports = Song;