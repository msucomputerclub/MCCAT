var request = new XMLHttpRequest();
request.setRequestHeader("Access-Control-Allow-Origin", "*");
request.open("GET", "localhost:5000", true);
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      console.log(movie.title);
    });
  } else {
    console.log("error");
  }
};

request.send();
