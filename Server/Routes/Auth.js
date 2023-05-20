const router = require("express").Router();
const user = require("../Models/user");
const User = require("../Models/user");

//Register
router.post("/register", async (req, res) => {
  const newUser = await new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user &&  res.status(404).send("User not found");

    const validPassword = (await req.body.password) === user.password;
    !validPassword &&  res.status(400).send("Wrong Password");

    return res.status(200).json(user);
  } catch (err) {
   return res.status(500).json("Bad Request");
  }
});

module.exports = router;
