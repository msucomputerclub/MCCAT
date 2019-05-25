const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Meeting = require("../../models/Meeting");

//import validation
const validateSigninInput = require("../../validation/signin");

const cleanCWID = require("../../validation/clean-cwid");

router.get("/", (req, res) => {
  var errors = [];
  Meeting.findOne({
    date: new Date().toLocaleDateString()
  }).then(meeting => {
    if (!meeting) {
      errors.nomeeting = "no meeting found";
      return res.status(404).json(errors);
    } else {
      return res.status(200).json(meeting.date);
    }
  });
});

router.post("/signin", (req, res) => {
  const cwid = cleanCWID(req.body.cwid);
  const { errors, isValid } = validateSigninInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ cwid }).then(user => {
    if (!user) {
      errors.usernotfound = "user not found";
      return res.status(404).json(errors);
    } else {
      Meeting.findOne({ date: new Date().toLocaleDateString() }).then(
        meeting => {
          if (meeting) {
            Meeting.update(
              { date: new Date().toLocaleDateString() },
              {
                $push: {
                  attendees: {
                    $each: [user.id],
                    position: -1
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
            errors.nomeeting = "no meeting today";
            return res.status(404).json(errors);
          }
        }
      );
    }
  });
});

router.post("/test", (req, res, next) => {
  console.log(req.body);
  return res.status(200).json(req.formData);
});

router.get("/create/today", (req, res) => {
  Meeting.findOne({ date: new Date().toLocaleDateString() }).then(meeting => {
    if (meeting) {
      console.log(JSON.stringify(meeting));
      errors.meetingexists = "meeting already exists";
      return res.status(400).json(errors);
    } else {
      new Meeting({
        date: new Date().toLocaleDateString()
      })
        .save()
        .then(
          res.status(200).json({
            message: `meeting created for ${new Date().toLocaleDateString()}`
          })
        );
    }
  });
});

router.get("/info/:date", (req, res) => {
  Meeting.findOne({
    date: new Date(req.params.date).toLocaleDateString()
  }).then(meeting => {
    if (!meeting) {
      errors.nomeeting = "no meeting found";
      return res.status(404).json(errors);
    } else {
      return res.status(200).json(meeting);
    }
  });
});

module.exports = router;
