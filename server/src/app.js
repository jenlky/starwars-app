const express = require("express");
const peopleRouter = require("./routes/people.route");
const cors = require("cors");

const app = express();
// have problem w corsOption. to be fixed.
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/people", peopleRouter);
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  if (!err.message) {
    err.message = "Something unexpected happened.";
  }
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
