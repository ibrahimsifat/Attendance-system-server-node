const User = require("../models/User");

const getUserByPropertyName = (key, value) => {
  if (key === "_id") {
    return User.findById(key);
  }
  return User.findOne({ [key]: value });
};

module.exports = {
  getUserByPropertyName,
};
