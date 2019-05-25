function cleanCWID(cwid) {
  //clean user input in case the cwid was entered through id swipe or manual
  try{
    var match = cwid.match(/(^;\d{9}(?:=))|(^M\d+)|(^\d{8,9})/g); //match student id card or manual
  }catch(e){
    var match="";
  }
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
