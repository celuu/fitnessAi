const Workout = require("../models/Workout");
const mongoose = require("mongoose");

// get exercise


// create new exercise
const createExercise = async (req, res) => {
  const { name, description, muscle_group } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!muscle_group) {
    emptyFields.push("muscle_group");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const exercise = await Exercise.create({ name, description, muscle_group });
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete an exercise
const deleteExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such exercise" });
  }

  const exercise = await Exercise.findOneAndDelete({ _id: id });

  if (!exercise) {
    return res.status(400).json({ error: "No such exercise" });
  }

  res.status(200).json(workout);
};

// update an exercise
const updateExercise = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such exercise" });
  }

  const exercise = await Exercise.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!exercise) {
    return res.status(400).json({ error: "No such exercise" });
  }

  res.status(200).json(exercise);
};

module.exports = {
  getExercise,
  getExercises,
  createExercise,
  deleteExercise,
  updateExercise,
};
