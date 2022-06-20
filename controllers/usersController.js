const userService = require("../services/users.services");

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, roles, accountStatus } = req.body;
    const user = await userService.createUserService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsersService();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// get a user with params id
const getAUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserByPropertyName(userId);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
const updateAUser = (req, res) => {};
const deleteAUser = (req, res) => {};

module.exports = {
  createUser,
  getAllUsers,
  updateAUser,
  getAUser,
  deleteAUser,
};
