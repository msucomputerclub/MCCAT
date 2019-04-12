const mongoose = require("mongoose");
const express = require("express");

// const readline = require("readline-sync");

const User = require("./models/User");
const Meeting = require("./models/Meeting");
// var stdin = process.openStdin();

var db = "mongodb://mccatadmin:123456A@ds137596.mlab.com:37596/mccat";
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(err => console.log(err));

Meeting.findOne({ date: new Date().getDate() }).then(meeting => {
  if (!meeting) {
    var day = new Date();
    new Meeting({
      date: day.toLocaleDateString()
    })
      .save()
      .then(console.log(`new meeting created on ${day.getDate()}`));
  }
});

var main = (function*() {
  // just import and initialize 'readline' in nodejs
  var r = require("readline");
  var rl = r.createInterface({ input: process.stdin, output: process.stdout });

  // magic here, the callback is the iterator.next
  var answerA = yield rl.question("do you want this? ", res => main.next(res));

  // and again, in a sync fashion
  var answerB = yield rl.question("are you sure? ", res => main.next(res));

  // readline boilerplate
  rl.close();

  console.log(answerA, answerB);
})(); // <-- executed: iterator created from generator
main.next(); // kick off the iterator,

// stdin.on("data", function(chunk) {
//   console.log("\033[2J");
//   console.log("ID is : " + chunk.toString().match(/\d{6,}/g));
//   User.findOne({cwid: chunk}).then(user=>{
//       if(!user){
//           //register user

//       }
//   })
// });
