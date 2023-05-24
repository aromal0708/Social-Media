const User = require("../Models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        // Hashing password using Bcrypt library
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(404).json({
          status: "failed",
          message: err.message,
        });
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({
        message: "Your Account has been updated",
        user,
      });
    } catch (err) {
      res.status(404).json(err);
    }
  } else {
    return res.status(403).json("You can Update only on your Account");
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).send("Account has been deleted");
    } catch (err) {
      res.status(403).send(err.message);
    }
  } else {
    return res.status(403).json("You can only delete your account");
  }
});

//Get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, isAdmin, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Follow a User

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id} });
        res.status(200).json("Followed")
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).send("you can't follow yourself");
  }
});
module.exports = router;
