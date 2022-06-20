// external import
const express = require("express");

//internal import
const router = require("../routers");

const app = express();

// middleware
app.use(express.json());

// routers
app.use("/api/v1", router);

app.get("/", (_req, res) => {
  const obj = {
    name: "Ayman",
    email: "ayman@example.com",
  };
  res.json(obj);
});

// default error handler
app.use((err, req, res, next) => {
  const message = err.message ? err.message : "Server Error Occurred";
  const statusCode = err.status ? err.status : 500;
  console.log(err);
  res.status(statusCode).json({ error: message });
});
module.exports = app;
