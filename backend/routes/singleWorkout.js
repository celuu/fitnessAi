const express = require("express");
const {
  createSingleWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteSingleWorkout,
  updateSingleWorkout,
} = require("../controllers/singleWorkoutController");

const router = express.Router();

// GET all workouts
router.get("/", getAllWorkouts);

//GET a single workout
router.get("/:id", getSingleWorkout);

// POST a new workout
router.post("/", createSingleWorkout);

// DELETE a single workout
router.delete("/:id", deleteSingleWorkout);

// UPDATE a single workout
router.patch("/:id", updateSingleWorkout);

module.exports = router;
