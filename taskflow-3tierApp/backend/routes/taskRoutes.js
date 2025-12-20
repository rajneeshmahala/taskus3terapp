const router = require("express").Router();
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  res.json(await Task.find());
});

router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;