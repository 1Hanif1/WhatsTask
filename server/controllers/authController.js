const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const path = require("path");

const registerUser = async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  // find the user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ error: "Invalid login credentials" });
  }
  // compare the password
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).send({ error: "Invalid login credentials" });
  }
  // create a JWT token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .header("auth-token", token)
    .send({ message: "User logged in successfully", token });
};

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send({ error: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid token" });
  }
};

export { registerUser, loginUser, verifyToken };
