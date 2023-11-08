const WorkoutStep = require("../models/WorkoutStep");
const mongoose = require("mongoose");

// get all workouts
const getAllWorkoutStepsInAWorkout = async (req, res) => {
//   try {
//     const workouts = await Workout.find();
//     return res.json(workouts);
//   } catch (err) {
//     return res.json([]);
//   }
};

// get workout by id
const getSingleWorkoutStep = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const workout = await Workout.findById({ _id: id });
//     if (workout) {
//       return res.json(workout);
//     } else {
//       return res.status(404).json({ message: "Workout not found" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: "An error occurred" });
//   }
};

// create new workout
const createWorkoutStep = async (req, res) => {
  const { user_id, date, duration } = req.body;

  let emptyFields = [];

  if (!user_id) {
    emptyFields.push("user_id");
  }
  if (!date) {
    emptyFields.push("date");
  }
  if (!duration) {
    emptyFields.push("duration");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const workout = await WorkoutStep.create({ user_id, date, duration });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkoutStep = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  console.log("work", workout);

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkoutStep = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  getAllWorkoutStepsInAWorkout,
  getSingleWorkoutStep,
  createWorkoutStep,
  deleteWorkoutStep,
  updateWorkoutStep,
};
