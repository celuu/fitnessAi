const Workout = require('../models/Workout')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    try {
      const workouts = await Workout.find()
        .populate("user_id", "_id", "date", "duration")
        .sort({ createdAt: -1 });
      return res.json(workouts);
    } catch (err) {
      return res.json([]);
    }
}

// get workout by id
const getWorkout = async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const workout = await Workout.findById(workoutId)
      .populate("user_id", "_id", "date", "duration")
      .sort({ createdAt: -1 });
    return res.json(workout);
  } catch (err) {
    return res.json([]);
  }
};

// create new workout
const createWorkout = async (req, res) => {
  const {user_id, date, duration} = req.body

  let emptyFields = []

  if (!user_id) {
    emptyFields.push("user_id");
  }
  if (!date) {
    emptyFields.push("date");
  }
  if (!duration) {
    emptyFields.push("duration");
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const workout = await Workout.create({ user_id, date, duration });
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}


module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};