// defines the routes and what logic should be run when requests are made at specified routes

const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get('/likedSongs', UserController.get_userLikedSongs); // makes get request to user/likedSongs
router.get('/profile/:uid', UserController.get_userProfile);

router.post('/hello', UserController.post_postHello);

module.exports = router;
