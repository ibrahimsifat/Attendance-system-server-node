// external import
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// internal import
const config = require("../config/config");
const { getUserByPropertyName } = require("./users.services");
const error = require("./error");

const registerService = async ({ name, email, password }) => {
  // const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    throw error(400, "Invalid Data");
  }
  // let user = await User.findOne({ email });
  let user = await getUserByPropertyName("email", email);
  if (user) {
    throw error(400, "User already exists");
  }
  user = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  user.password = hash;

  return user.save();
};

const loginService = async ({ email, password }) => {
  const user = await getUserByPropertyName("email", email);

  if (!user) {
    throw error(400, "Invalid Credential");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw error(400, "Invalid Credential");
  }

  // create token
  const userPayload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(userPayload, config.JWTSecret, { expiresIn: "2h" });

  return token;
};

module.exports = { registerService, loginService };
