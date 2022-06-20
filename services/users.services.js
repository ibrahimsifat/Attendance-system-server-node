const User = require("../models/User");

const getUserByPropertyName = (key, value) => {
  if (key === "_id") {
    return User.findById(key);
  }
  return User.findOne({ [key]: value });
};

const createUser = (req, res) => {};

const getAllUsers = (req, res) => {};

const getAUser = (req, res) => {};
const updateAUser = (req, res) => {};
const deleteAUser = (req, res) => {};
module.exports = {
  getUserByPropertyName,
  createUser,
  getAllUsers,
  updateAUser,
  getAUser,
  deleteAUser,
};
