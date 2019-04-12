const express = require("express");
const router = express.Router();

//import models
const User = require("../../models/User");

//import validation
const validateRegisterInput = require("../../validation/register");

//tools
const cleanCWID = require("../../validation/clean-cwid");

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
        .then(err => {
          if (err) {
            return res.status(200).json("user registered");
          }
        });
    }
  });
});

router.get("/info", (req, res) => {
  req.body.cwid = cleanCWID(req.body.cwid);
  User.findOne({ cwid: req.body.cwid }).then(user => {
    if (!user) {
      return res.status(404).json("user not found");
    } else {
      res.json(user);
    }
  });
});

router.get("/test/:data", (req, res) => {
  var data = req.params.data
    .match(/(^;\d{9}(?:=))|(^M\d+)|(^\d{8,9})/g)[0]
    .replace(/\D/g, "")
    .replace(/^0+/g, "")
    .trim();
  console.log(data);
  return res.json(data);
});

module.exports = router;
