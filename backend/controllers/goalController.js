const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({});
  res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide a text field");
  }

  const goal = await Goal.create({ text: req.body.text });

  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal you're trying to update does not exist");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal you're trying to delete does not exist");
  }

  const deletedGoal = await Goal.findByIdAndDelete(id);

  res.status(200).json(deletedGoal);
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
