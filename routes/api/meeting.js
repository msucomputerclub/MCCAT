const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Meeting = require("../../models/Meeting");

router.post("/signin", (req, res) => {
  User.findOne({ cwid: req.body.cwid }).then(user => {
    if (!user) {
      return res.status(404).json("user not found");
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
            return res.status(404).json("no meeting today");
          }
        }
      );
    }
  });
});

router.post("/create/today", (req, res) => {
  Meeting.findOne({ date: new Date().toLocaleDateString() }).then(meeting => {
    if (meeting) {
      console.log(JSON.stringify(meeting));
      return res.status(400).json("meeting already exists");
    } else {
      new Meeting({
        date: new Date().toLocaleDateString()
      })
        .save()
        .then(
          res
            .status(200)
            .json(`meeting created for ${new Date().toLocaleDateString()}`)
        );
    }
  });
});

router.get("/info/:date", (req, res) => {
  Meeting.findOne({
    date: new Date(req.params.date).toLocaleDateString()
  }).then(meeting => {
    if (!meeting) {
      return res.status(404).json("no meeting found");
    } else {
      return res.status(200).json(meeting);
    }
  });
});

module.exports = router;
