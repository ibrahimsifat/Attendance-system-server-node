const router = require("express").Router();
const userService = require("../services/users.services");

// routers path:['/']
router.route("/").get(userService.getAllUsers).post(userService.createUser);

// routers path:['/:userId']
router
  .route("/:userId")
  .get(userService.getAUser)
  .put(userService.updateAUser)
  .delete(userService.deleteAUser);
module.exports = router;
