const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      alias: "_id",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    muscle_group: {
      type: String,
      required: true,
    },
  }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
