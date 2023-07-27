const express = require("express");
let { ObjectId } = require("mongodb");
const router = express.Router();
const Videos = require("../models/videos.js");
const Comments = require("../models/comments.js");
const Products = require("../models/products.js");

// get list video
router.get("/video/getVideos", async (req, res) => {
  try {
    const videos = await Videos.find();
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// add video
router.post("/video/add", (req, res) => {
  const video = new Videos({
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    link: req.body.link,
  });

  try {
    const videoToSave = video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get video by id
router.get("/video/get/:id", async (req, res) => {
  try {
    const video = await Videos.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    res.status(404).json({ message: "Video doesn't exist" });
  }
});
// update video by id
router.patch("/video/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataUpdate = req.body;
    const options = { new: true };
    const updateVideo = await Videos.findByIdAndUpdate(id, dataUpdate, options);
    res.status(200).send(updateVideo);
  } catch (error) {
    res.status(404).json({ message: "video doesn't exist" });
  }
});
// delete video by id
router.delete("/video/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteVideo = await Videos.findByIdAndDelete(id);
    res
      .status(200)
      .send({ message: `video ${deleteVideo.title} has been deleted` });
  } catch (error) {
    res.status(404).json({ message: "video doesn't exist" });
  }
});

// get comments by videoID
router.get("/comment/get/:videoId", async (req, res) => {
  try {
    const videoId = new ObjectId(req.params.videoId);
    const comments = await Comments.find({ videoId });
    if (comments.length <= 0) {
      res.status(404).json({ message: "comment not found" });
    } else {
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// add comment

router.post("/comment/add", (req, res) => {
  let timeStamp = new Date();
  const comment = new Comments({
    username: req.body.username,
    content: req.body.content,
    videoId: new ObjectId(req.body.videoId),
    timeStamp,
  });
  try {
    const commentTosave = comment.save();
    res
      .status(201)
      .json({ message: "your comment has been sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete comment
router.delete("/comment/delete/:id", async (req, res) => {
  try {
    const deleteComment = await Comments.findByIdAndDelete(req.params.id);
    res.send(`comment from ${deleteComment.username} has been deleted`);
  } catch (error) {
    res.status(400).json({ message: "comment doesn't exist" });
  }
});

// update comment
router.patch("/comment/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataUpdate = req.body;
    const option = { new: true };
    dataUpdate.timeStamp = new Date();

    const updateComment = await Comments.findByIdAndUpdate(
      id,
      dataUpdate,
      option
    );
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(404).json({ message: "comment doens't exist" });
  }
});

// add products
router.post("/product/add", (req, res) => {
  const product = new Products({
    title: req.body.title,
    price: req.body.price,
    linkProduct: req.body.linkProduct,
    videoId: new ObjectId(req.body.videoId),
  });
  try {
    const productTosave = product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get product by videoId
router.get("/product/get/:videoId", async (req, res) => {
  try {
    const videoId = new ObjectId(req.params.videoId);
    const products = await Products.find({ videoId });
    if (products.length <= 0) {
      res.status(404).json({ message: "comment not found" });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update product by id
router.patch("/product/update/:id", async (req, res) => {
  const id = req.params.id;
  const updateProduct = req.body;
  const option = { new: true };
  try {
    const ProductToUpdate = await Products.findByIdAndUpdate(
      id,
      updateProduct,
      option
    );
    res.status(201).json(ProductToUpdate);
  } catch (error) {
    res.status(404).json({ message: "product doesn't exist" });
  }
});

// delete product by id
router.delete("/product/delete/:id", async (req, res) => {
  try {
    const deleteProduct = await Products.findByIdAndDelete(req.params.id);
    res.status(200).send(`product ${deleteProduct.title} has been deleted`);
  } catch (error) {
    res.status(404).json({ message: "product doesn't exist" });
  }
});

// using videoId to return video, product and comment
router.get("/:id", async (req, res) => {
  try {
    const video = await Videos.aggregate([
      {
        $match: { _id: new ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "videoId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "videoId",
          as: "products",
        },
      },
    ]);
    res.status(200).json(video);
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
