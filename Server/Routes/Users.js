const user = require("../Models/user");
const User = require("../Models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Update User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(404).json({
          status: "failed",
          message: err.message,
        });
      }
    }
    try{
      const user = await User.findByIdAndUpdate(req.params.id,{
        $set:req.body
      })
      res.status(200).json("Acount has been Updated")
    }catch(err){
      res.status(404).json(err)
    }
  } else {
    return res.status(403).json("You can Update only on your Account");
  }
});

module.exports = router;
