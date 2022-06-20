const http = require("http");
const app = require("./app/app");
const connectDB = require("./services/db");
const server = http.createServer(app);

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("Database Connected");
    server.listen(4000, () => {
      console.log("I'm listening on port 4000");
    });
  })
  .catch((e) => console.log(e));
