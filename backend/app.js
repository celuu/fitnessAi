require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
require("./models/User");
require("./models/Workout");
require("./models/Exercise");
require("./config/passport");
const userRoutes = require("./routes/api/users");
const workoutRoutes = require("./routes/api/workouts");
const exerciseRoutes = require("./routes/api/exercise");
const passport = require("passport");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(passport.initialize());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
