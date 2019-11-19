const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSigninInput(data) {
  let errors = {};

  data.cwid = !isEmpty(data.cwid) ? data.cwid : "";

  if (!Validator.isLength(data.cwid, { min: 8, max: 8 })) {
    errors.cwid = "CWID must be 8 digits.";
  }

  if (Validator.isEmpty(data.cwid)) {
    errors.cwid = "Invalid CWID.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
