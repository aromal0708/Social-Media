const router = require("express").Router();
const Post = require("../Models/Post");
const User = require("../Models/user");

// create a Post
router.post("/", async (req, res) => {
  newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json(err);
    throw err;
  }
});

// Update a Post
router.put("/:id", async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (Post.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json({
        message: "Post has been Updated",
        Post,
      });
    } else {
      res.status(403).send("you can update only your account");
    }
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
});

// Delete a Post
router.delete("/:id", async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (Post.userId === req.body.userId) {
      await Post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).send("you can only delete posts on your account");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like or Dislike a Post

router.put("/:id/like", async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (!Post.likes.includes(req.body.userId)) {
      await Post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post Liked");
    } else {
      await Post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post Disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a Post
router.get("/:id", async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    res.status(200).json(Post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get timeline Post
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPost = await Post.find({ userId: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(friendPost.concat(...userPost));
  } catch (err) {
    res.status(500).json({
      message:err.message
    });
  }
});

module.exports = router;
