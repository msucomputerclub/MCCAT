const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { secretOrKey } = process.env;

//import models
const User = require("../../models/User");

//  @route  POST api/u/login
//  @desc   login user
//  @access Public
router.post("/login", (req, res) => {
  let errors = {};
  // const { errors, isValid } = validateLoginInput(req.body);
  // //check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  console.log(req.body);
  const { email, cwid } = req.body;
  //Find user by email
  User.findOne({ email: email }).then(user => {
    //check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    if (user.role !== "admin") {
      errors.fobidden = "you do not have permissions";
      return res.status(403).json(errors);
    }

    if (user.cwid !== cwid) {
      errors.wrongcreds = "wrong credentials";
      return res.status(400).json(errors);
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    //Sign Token
    jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });

      //   //check password
      //   bcrypt.compare(password, user.password).then(isMatch => {
      //     if (isMatch) {
      //       //User mathed

      //       //Create JWT payload
      //       const payload = {
      //         id: user.id,
      //         email: user.email,
      //         role: user.role
      //       };

      //       //Sign Token
      //       jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
      //         res.json({
      //           success: true,
      //           token: "Bearer " + token
      //         });
      //       });
      // } else {
      //   errors.password = "Password incorrect";
      //   return res.status(400).json(errors);
      // }
    });
  });
});

module.exports = router;
