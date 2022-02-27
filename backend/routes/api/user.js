const express = require("express");
const router = express.Router();

const userController = require("../../Controllers/userController");

router.post("/register", userController.register);

router.get("/getUser/:handle", userController.getUser);

router.get("/getAllTweets", userController.getAllTweets);

router.get("/getTweet/:id", userController.getTweet);

router.post("/writeTweet/:handle", userController.writeTweet);

router.post("/Comment/:handle/:tweetID", userController.writeComment);

module.exports = router;
