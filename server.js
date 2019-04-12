const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const { mongoURI, port } = require("./config/config");

const users = require("./routes/api/users");
const meeting = require("./routes/api/meeting");

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/meeting", meeting);

app.get("/", (req, res) => {
  res.json("home page");
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
