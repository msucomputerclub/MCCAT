const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("passport");
const cors = require("cors");

const { mongoURI, port } = process.env;

const users = require("./routes/api/users");
const meeting = require("./routes/api/meeting");
const admin = require("./routes/api/admin");

const app = express();

app.use(cors());

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/meeting", meeting);

const server = app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

//handle unhandled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});
