// external import
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// internal import
const config = require("../config/config");
const { getUserByPropertyName } = require("./users.services");
const error = require("./error");

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

module.exports = { loginService };
