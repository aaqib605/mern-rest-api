const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });
  res.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide a text field");
  }

  const goal = await Goal.create({ text: req.body.text, user: req.user._id });

  res.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const goal = await Goal.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal you're trying to update does not exist");
  }

  // Check if the user trying to update the goal exists or not
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User trying to update the goal does not exist");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized to update the goal");
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

  // Check if the user trying to delete the goal exists or not
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User trying to delete the goal does not exist");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized to delete the goal");
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
