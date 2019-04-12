function cleanCWID(cwid) {
  //clean user input in case the cwid was entered through id swipe or manual
  match = cwid.match(/(^;\d{9}(?:=))|(^M\d+)|(^\d{8,9})/g); //match student id card or manual
  if (match) {
    return match[0]
      .replace(/\D/g, "") //remove non digit characters
      .replace(/^0+/g, "") //remove extra zeros from beginning
      .trim();
  } else {
    return "";
  }
}

module.exports = cleanCWID;
