const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.cwid = !isEmpty(data.cwid) ? data.cwid : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "First Name must be between 2 and 30 characters.";
  }
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Last Name must be between 2 and 30 characters.";
  }
  if (!Validator.isLength(data.cwid, { min: 8, max: 8 })) {
    errors.cwid = "CWID must be 8 digits.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email cannot be empty.";
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name cannot be empty.";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name cannot be empty.";
  }
  if (Validator.isEmpty(data.cwid)) {
    errors.cwid = "CWID invalid.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email must be valid.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
