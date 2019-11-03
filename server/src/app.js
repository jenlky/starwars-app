const express = require("express");
const peopleRouter = require("./routes/people.route");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: [
    "https://swapi.co/api/",
    "http://localhost:3000/",
    "http://localhost:3001/"
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204
};
// get it working w corsOptions for security
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
