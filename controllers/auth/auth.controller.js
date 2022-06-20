// internal import
const authService = require("../../services/auth.services");
const userService = require("../../services/users.services");
// register controller to register the users
const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.createUserService({ name, email, password });
    return res.status(201).json({ message: "User Created Successfully", user });
  } catch (error) {
    next(error);
  }
};

// login controller to login the users
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginService({ email, password });
    res.status(200).json({ message: "Login Successful", token: token });
  } catch (errors) {
    next(errors);
  }
};
module.exports = { registerController, loginController };
