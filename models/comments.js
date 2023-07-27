const mongoose = require("mongoose");

const commetSchema = mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  videoId: {
    required: true,
    type: Object,
  },
  timeStamp: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Comments", commetSchema);
