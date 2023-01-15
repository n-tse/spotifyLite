const router = require("express").Router();
const SongController = require("../controllers/SongController");

router.get('/', SongController.get_showAllSongs);
router.put('/addLikedSong', SongController.put_addLikedSong);

module.exports = router;