require("dotenv").config();
const cors = require("cors")
const express = require("express");
const mongoose = require("mongoose");
require("./models/User");
require("./models/WorkoutSession");
require("./models/Exercise");
require("./models/WorkoutStep");
require("./config/passport");
const userRoutes = require("./routes/api/users");
const workoutRoutes = require("./routes/api/workoutSession");
const exerciseRoutes = require("./routes/api/exercise");
const workoutStepRoutes = require("./routes/api/workoutStep");
const passport = require("passport");

// express app
const app = express();

// middleware
app.use(cors())
app.use(express.json());
app.use(passport.initialize());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/workoutSession", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workoutStep", workoutStepRoutes);

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
