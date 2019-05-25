var request = new XMLHttpRequest();
var date = new Date();
request.open("GET", "http://localhost:5000/api/meeting/", true);
// request.setRequestHeader("Access-Control-Allow-Origin", "*");
request.setRequestHeader("Accept", "application/json");
request.setRequestHeader("Content-Type", "application/json");
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    var d = new Date(data);
    document.getElementById("date").innerHTML = d.toDateString();
  } else {
    var errstr = "";
    for (err in data) {
      errstr += data[err];
    }
    document.getElementById("date").innerHTML = errstr;
  }
};
request.send();

// var url = "http://localhost:5000/api/meeting/";
// fetch(url, {
//   method: "GET",
//   mode: "cors",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   });
