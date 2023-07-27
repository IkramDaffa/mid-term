const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  linkProduct: {
    required: true,
    type: String,
  },
  videoId: {
    required: true,
    type: Object,
  },
});

module.exports = mongoose.model("Products", productSchema);
