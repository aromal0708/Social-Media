const User = require("../Models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        console.log(req.body)
        console.log(req.params.id)
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      res.status(403).send("You can Update only your Account");
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      });
      console.log(user)
      res.status(200).json("Account has been Updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  }

});

module.exports = router;
