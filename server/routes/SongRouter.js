const router = require("express").Router();
const SongController = require("../controllers/SongController");

router.put('/addLikedSong', SongController.put_addLikedSong);

module.exports = router;