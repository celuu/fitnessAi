const express = require("express");
const {
  createExercise,
  getExercises,
  getExercise,
  deleteExercise,
  updateExercise,
} = require("../../controllers/exerciseController");

const router = express.Router();

// GET all exercises
router.get("/", getExercises);

//GET a single exercise
router.get("/:id", getExercise);

// POST a new exercise
router.post("/", createExercise);

// DELETE an exercise
router.delete("/:id", deleteExercise);

// UPDATE an exercise
router.patch("/:id", updateExercise);

module.exports = router;
