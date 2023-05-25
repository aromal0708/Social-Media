const router = require("express").Router();
const Post = require("../Models/post");

// create a post
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

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.params.id) {
        await post.updateOne(({$set:req.body}))
        res.status(200).json("Post has been Updated")
    } else {
      res.status(403).send("you can update only your account");
    }
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
});

// Delete a post

// Like a post

// Get a post

// Get timeline Post

module.exports = router;
