const router = require("express").Router();

const { registerService, loginService } = require("../services/auth");
router.get("/get", (req, res) => {
  res.send("this  is bangladesh");
});

router.post("/register", registerService);

router.post("/login", loginService);

module.exports = router;
