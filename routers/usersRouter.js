const router = require("express").Router();
const userController = require("../controllers/usersController");
const authenticate = require("../middleware/auth/authenticate");
// routers path:['/']
router
  .route("/")
  .get(authenticate, userController.getAllUsers)
  .post(authenticate, userController.createUser);

// routers path:['/:userId']
router
  .route("/:userId")
  .get(authenticate, userController.getAUser)
  .put(authenticate, userController.updateAUser)
  .delete(authenticate, userController.deleteAUser);
module.exports = router;
