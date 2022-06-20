const User = require("../models/User");
const error = require("./error");
const bcrypt = require("bcryptjs");
const getUserByPropertyName = (key, value) => {
  if (key === "_id") {
    return User.findById(key);
  }
  return User.findOne({ [key]: value });
};

// create a user
const createUserService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  if (!name || !email || !password) {
    throw error(400, "Invalid Data");
  }

  // find user if user exists
  let user = await getUserByPropertyName("email", email);
  if (user) {
    throw error(400, "User already exists");
  }
  user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  user.password = hash;

  return user.save();
};

const getAllUsersService = () => {
  return User.find({});
};
module.exports = {
  getUserByPropertyName,
  getAllUsersService,
  createUserService,
};
