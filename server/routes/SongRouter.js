const router = require("express").Router();
const SongController = require("../controllers/SongController");

router.get('/', SongController.get_showAllSongs);
router.post('/allSongs', SongController.post_addLikedSong);

module.exports = router;