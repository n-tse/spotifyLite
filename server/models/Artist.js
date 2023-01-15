const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;
mongoose.set('strictQuery', true);

const ArtistSchema = new Schema({
  name: { type: String, required: true},
  song: [{ type: refType, ref: "Song" }] 
});

const Artist = mongoose.model("Artist", ArtistSchema, "Artist"); // after creating the schema above, we create an accompanying mongoose model. Returns the Mongoose object

module.exports = Artist;