const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  tweets: [
    {
      type: Schema.Types.ObjectId,
      default: [],
    },
  ],
});

module.exports = User = mongoose.model("User", UserSchema);
