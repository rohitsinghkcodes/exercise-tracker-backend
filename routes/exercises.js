const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// route to fetch list of all users data
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

//route to add new exercise details
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, description, duration, date });

  newExercise
    .save()
    .then(() => res.json("New exercise details added"))
    .catch((err) =>
      res.status(400).json("Unable to add new exercise to db.\nError: " + err)
    );
});

// route to fetch exercise using id
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

// route to delete data from db
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exeecise Deleted Succesfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update exercise details
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise Updated Succesfully!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
