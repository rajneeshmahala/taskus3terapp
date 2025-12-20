const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Task", TaskSchema);