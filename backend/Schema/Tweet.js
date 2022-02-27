const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    maxLength: 280,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
    default: 0,
  },
  reply: {
    type: Boolean,
    default: false,
  },
  replyTo: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
});

module.exports = Tweet = mongoose.model("Tweet", TweetSchema);
