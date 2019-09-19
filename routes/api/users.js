const express = require("express");
const router = express.Router();

//import models
const User = require("../../models/User");
const Meeting = require("../../models/Meeting");

//import validation
const validateRegisterInput = require("../../validation/register");

//import tools
const cleanCWID = require("../../validation/clean-cwid");

//@route  GET api/user/clean/:data
//@desc   TEMP clean cwid
//@access Public
router.get("/clean/:data", (req, res) => {
  var data = req.params.data
    .match(/(^;\d{9}(?:=))|(^M\d+)|(^\d{8,9})/g)[0]
    .replace(/\D/g, "")
    .replace(/^0+/g, "")
    .trim();
  console.log(data);
  return res.json(data);
});

//@route  POST api/user/register
//@desc   register memeber
//@access Public
router.post("/register", (req, res) => {
  req.body.cwid = cleanCWID(req.body.cwid);
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ cwid: req.body.cwid }).then(user => {
    if (user) {
      errors.userexists = "user already exists";
      return res.status(400).json(errors);
    } else {
      new User({
        cwid: req.body.cwid,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
        .save()
        .then(user => {
          console.log(`user ${user.firstName} registered`);
          Meeting.findOne({ date: new Date().toLocaleDateString() }).then(
            meeting => {
              if (meeting) {
                Meeting.updateOne(
                  { date: new Date().toLocaleDateString() },
                  {
                    $addToSet: {
                      attendees: {
                        _id: user._id
                      }
                    }
                  }
                )
                  .then(
                    res
                      .status(200)
                      .json(`Hello ${user.firstName}, welcome to Computer Club`)
                  )
                  .catch(err => console.log(err));
              } else {
                return res.status(404).json("Meeting does not exist");
              }
            }
          );
          // return res.status(200).json("user registered");
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});

//@route  POST api/user/register
//@desc   retrieve user info
//@access Public
router.post("/info", (req, res) => {
  req.body.cwid = cleanCWID(req.body.cwid);
  User.findOne({ cwid: req.body.cwid }).then(user => {
    if (!user) {
      return res.status(404).json("user not found");
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
