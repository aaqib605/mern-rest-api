const registerUser = (req, res) => {
  res.json({ message: "Register a new user" });
};

const loginUser = (req, res) => {
  res.json({ message: "Login a user" });
};

const getMe = (req, res) => {
  res.json({ message: "Get logged in user" });
};

module.exports = { registerUser, loginUser, getMe };
