function signin() {
  var formdata = $("form").serializeArray();
  var data = `${formdata[0].name}=${formdata[0].value}`;
  console.log(formdata[0].value);
  // alert("hello");

  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:5000/api/meeting/signin", true);
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onload = function() {
    // Begin accessing JSON data here
    var resp = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      alert(resp);
      location.reload();
    } else {
      if ((request.status = 404 && resp.usernotfound)) {
        //cleaning cwid
        var cwid = formdata[0].value
          .match(/(^;\d{9}(?:=))|(^M\d+)|(^\d{8,9})/g)[0]
          .replace(/\D/g, "")
          .replace(/^0+/g, "")
          .trim();
        document.cookie = `cwid=${cwid}; path=/`;
        location.assign("/public/register.html");
      } else {
        location.reload();
      }
    }
  };
  console.log(data);
  request.send(data);
}

function register() {
  var formdata = $("form").serializeArray();
  var data = "";
  for (i = 0; i < 4; i++) {
    data += `${formdata[i].name}=${formdata[i].value}&`;
  }
  console.log(formdata[0].value);

  var request = new XMLHttpRequest();
  request.open("POST", "http://localhost:5000/api/users/register", true);
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onload = function() {
    // Begin accessing JSON data here
    var resp = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      alert("Thank you for joining the Computer Club");
      location.assign("/public/index.html");
    } else {
      console.log(request.response);
      alert("error, let us know if this happens :/");
    }
  };
  console.log(data);
  request.send(data);
}
