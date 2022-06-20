// external import
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// internal import
const config = require("../config/config");

const registerService = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();
    return res.status(201).json({ message: "User Created Successfully", user });
  } catch (error) {
    next(error);
  }
};

const loginService = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    // create token
    const userPayload = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(userPayload, config.JWTSecret, { expiresIn: "2h" });

    return res.status(200).json({ message: "Login Successful", token: token });
  } catch (e) {
    next(e);
  }
};
module.exports = { registerService, loginService };
