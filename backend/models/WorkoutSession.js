const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSessionSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WorkoutSession', workoutSessionSchema)