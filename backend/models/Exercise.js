const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
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
