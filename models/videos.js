const mongoose = require("mongoose");

const videosSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  thumbnail: {
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Videos", videosSchema);
