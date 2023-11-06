const express = require("express");
const {
  getAllWorkoutStepsInAWorkout,
  getSingleWorkoutStep,
  createWorkoutStep,
  deleteWorkoutStep,
  updateWorkoutStep,
} = require("../controllers/workoutStepController");

const router = express.Router();

// GET all workouts
router.get("/:workout_id", getAllWorkoutStepsInAWorkout);

//GET a single workout
router.get("/:id", getSingleWorkoutStep);

// POST a new workout
router.post("/", createWorkoutStep);

// DELETE a single workout
router.delete("/:id", deleteWorkoutStep);

// UPDATE a single workout
router.patch("/:id", updateWorkoutStep );

module.exports = router;
