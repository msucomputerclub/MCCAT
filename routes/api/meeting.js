const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Meeting = require("../../models/Meeting");

//import validation
const validateSigninInput = require("../../validation/signin");
const cleanCWID = require("../../validation/clean-cwid");

//@route  GET api/meeting
//@desc get current meeting date
//@access Public
router.get("/", (req, res) => {
  var errors = {};
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

router.get("/all", (req, res) => {
  var data = { dates: [] };
  Meeting.find().then(meet => {
    meet.forEach(m => {
      data.dates.push({ date: m.date, count: m.attendees.length });
    });
    return res.json(data);
  });
});

//@route  GET api/meeting/create/today
//@desc   create meeting for current day
//@access Public
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

//@route  GET api/meeting/:date
//@desc   get names of attendees for a given date
//@access Public
router.get("/:date", (req, res) => {
  errors = {};
  Meeting.findOne({
    date: new Date(req.params.date).toLocaleDateString()
  })
    .populate("attendees", "firstName lastName")
    .then(meeting => {
      if (!meeting) {
        errors.nomeeting = "no meeting found";
        return res.status(404).json(errors);
      } else {
        const list = [];
        meeting.attendees.forEach(member => {
          list.push(`${member.firstName} ${member.lastName}`);
        });
        res.json({
          list: list
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//@route  GET api/meeting/sheets/:date
//@desc   get sheets function to import attendance
//@access Public
router.get("/sheets/:date", (req, res) => {
  errors = {};
  Meeting.findOne({
    date: new Date(req.params.date).toLocaleDateString()
  })
    .populate("attendees", "firstName lastName")
    .then(meeting => {
      if (!meeting) {
        errors.nomeeting = "no meeting found";
        return res.status(404).json(errors);
      } else {
        const list = [];
        meeting.attendees.forEach(member => {
          list.push(`${member.firstName} ${member.lastName}`);
        });
        res.send(`=TRANSPOND(SPLIT("${list.join()}",","))`);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//@route  POST api/meeting/signin
//@desc   member sign in
//@access Public
router.post("/signin", (req, res) => {
  console.log(req.body);
  var cwid = (req.body.cwid = cleanCWID(req.body.cwid));
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
    }
  });
});

//@route  POST api/meeting/test
//@desc   checking for received form data
//@access Public
router.post("/test", (req, res, next) => {
  console.log(req.body);
  return res.status(200).json(req.formData);
});

router.delete("/:date", (req, res) => {
  Meeting.deleteOne({ date: new Date(req.params.date).toLocaleDateString() })
    .then(response => {
      return res.status(200).json("meeting removed");
    })
    .catch(err => {
      console.warn(err);
      return res.status(500).json(err);
    });
});

module.exports = router;
