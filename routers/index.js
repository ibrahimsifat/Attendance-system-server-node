const router = require("express").Router();
const authRouter = require("./authRouter");
const usersRouter = require("./usersRouter");
// auth router
router.use("/auth", authRouter);

// users router
router.use("/users", usersRouter);
module.exports = router;
