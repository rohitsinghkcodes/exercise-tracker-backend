const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//creating the express server
const app = express();
const port = process.env.PORT || 5000;

//setting up the middleware
app.use(cors());
app.use(express.json());

//making the mongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log(
    "\n**** MONGODB DATABASE CONNECTION ESTABLISHED SUCCESSFULLY! ****\n"
  );
});

//asking the server to use route files
const usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");

app.use("/users",usersRouter);
app.use("/exercises",exercisesRouter);


app.listen(port, () => {
  console.log(`\n**** SERVER IS UP AND RUNNING ON PORT: ${port} ****\n`);
});
