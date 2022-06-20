const config = require("../../config/config");
const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // const cookie = req.cookies.t;
  const token = authHeader && authHeader.split(" ")[1];
  //   console.log(token);
  //   console.log(cookie);
  if (token == null) return res.status(401).json({ error: "unauthorized" });
  jwt.verify(token, config.JWTSecret, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  });
};

module.exports = authenticate;
