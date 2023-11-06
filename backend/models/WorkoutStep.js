const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const singleWorkoutSchema = new Schema({
  workout_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
    required: true,
  },
  exercise_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Single Workout", singleWorkoutSchema);
