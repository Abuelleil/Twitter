const User = require("../Schema/User");
const bcrypt = require("bcryptjs");
const Tweet = require("../Schema/Tweet");

exports.register = async (req, res) => {
  if (!req.body.email)
    return res.send({ error: "you need an email to register" });
  if (!req.body.handle)
    return res.send({ error: "you need a handle to register" });

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    var user = await User.create(req.body);
    return res.send({ data: user });
  } catch (err) {
    return res.send({ error: console.log(err) });
  }
};

exports.writeTweet = async (req, res) => {
  if (!req.body.text)
    return res.send({ error: "you need an text to write a tweet" });
  if (!req.params.handle)
    return res.send({ error: "you need a handle to tweet" });

  try {
    var handle = req.params.handle;
    var user = User.find({ handle: handle }, function (err, users) {
      if (err) {
        console.log(err);
      }
      if (!users.length) {
        return res.send({ error: "no such user" });
      }
    });
    req.body.author = handle;
    req.body.date = new Date();
    var tweet = await Tweet.create(req.body);
    await User.findOneAndUpdate(
      { handle: handle },
      { $push: { tweets: [tweet._id] } }
    );
    return res.send({ data: tweet });
  } catch (err) {
    return res.send({ error: console.log(err) });
  }
};

exports.writeComment = async (req, res) => {
  if (!req.body.text)
    return res.send({ error: "you need an text to write a tweet" });
  if (!req.params.handle)
    return res.send({ error: "you need a handle to tweet" });
  if (!req.params.tweetID)
    return res.send({ error: "you cannot comment a none existent tweet" });

  try {
    var handle = req.params.handle;
    var user = User.find({ handle: handle }, function (err, users) {
      if (err) {
        console.log(err);
      }
      if (!users.length) {
        return res.send({ error: "no such user" });
      }
    });

    var tweet = Tweet.find({ _id: req.params.tweetID }, function (err, tweets) {
      if (err) {
        console.log(err);
      }
      if (!tweets.length) {
        return res.send({ error: "no such tweet" });
      }
    });

    req.body.author = handle;
    req.body.date = new Date();
    var tweet = await Tweet.create(req.body);
    await User.findOneAndUpdate(
      { handle: handle },
      { $push: { tweets: [tweet._id] } }
    );
    await Tweet.findOneAndUpdate(
      { _id: req.params.tweetID },
      { $push: { comments: [tweet._id] } }
    );
    return res.send({ data: tweet });
  } catch (err) {
    return res.send({ error: console.log(err) });
  }
};

exports.getUser = async (req, res) => {
  if (!req.params.handle)
    return res.send({ error: "you need a handle to search for user" });

  try {
    const handle = req.params.handle;
    const user = await User.find({ handle: handle });
    return res.send({ data: user });
  } catch (err) {
    return res.send({ error: console.log(err) });
  }
};

exports.getTweet = async (req, res) => {
  if (!req.params.handle)
    return res.send({ error: "you need a handle to search for user" });

  try {
    const id = req.params.id;
    const tweet = await Tweet.findById(id);
    return res.send({ data: tweet });
  } catch (err) {
    return res.send({ error: console.log(err) });
  }
};

exports.getAllTweets = async (req, res) => {
  try {
    const tweet = await Tweet.find();
    return res.send({ data: tweet });
  } catch (err) {
    return res.send({ error: console.log(err) });
  }
};
