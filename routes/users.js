const router = require("express").Router();
let User = require("../models/user.model");

// route to fetch list of all users data
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//route to add new user
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("New user added"))
    .catch((err) =>
      res.status(400).json("Unable to add new user to db!" + " Error msg: " + err)
    );
});

module.exports = router;
