const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.post("/register", (req, res) => {
  var cwid = req.body.cwid;

  User.findOne({ cwid: cwid }).then(user => {
    if (user) {
      return res.status(400).json("user alreadt exists");
    } else {
      new User({
        cwid: cwid,
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
  User.findOne({ cwid: req.body.cwid }).then(user => {
    if (!user) {
      return res.status(404).json("user not found");
    } else {
      res.json(user);
    }
  });
});

module.exports = router;
