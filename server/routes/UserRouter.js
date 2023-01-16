// defines the routes and what logic should be run when requests are made at specified routes

const router = require("express").Router(),
verifyToken = require("../middlewares/authJWT"),
{
  signup,
  signin
} = require("../controllers/auth.controller");
const UserController = require("../controllers/UserController");

router.post("/signup", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {

});

router.get("/hiddencontent", verifyToken, function (req, res) {
  if (!user) {
    res.status(403)
      .send({
        message: "Invalid JWT token"
      });
  }
  if (req.user == "admin") {
    res.status(200)
      .send({
        message: "Congratulations! but there is no hidden content"
      });
  } else {
    res.status(403)
      .send({
        message: "Unauthorized access"
      });
  }
});

router.get('/likedSongs', UserController.get_userLikedSongs); // makes get request to user/likedSongs
router.get('/profile/:uid', UserController.get_userProfile);

router.post('/hello', UserController.post_postHello);

module.exports = router;
