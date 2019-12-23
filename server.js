const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const { mongoURI, port } = require("./config/config");

const users = require("./routes/api/users");
const meeting = require("./routes/api/meeting");

const app = express();

app.use(cors());

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/meeting", meeting);

app.get("/", (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/public/index.html`));
});
app.get("/register", (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/public/register.html`));
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
