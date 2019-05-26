function signin(){
    var formdata=$('form').serializeArray();
    var data=`${formdata[0].name}=${formdata[0].value}`;
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
        if(request.status = 404 && resp.usernotfound){
            if(confirm("We did not find you in our database, are you new?")){
                location.assign("/client2/register.html");
            }else{
                location.reload();
            }
        }else{
            var errstr = "";
            for (err in resp) {
            errstr += resp[err];
            }
            alert(errstr);
        }

        // document.getElementById("date").innerHTML = errstr;
    }
    };
    request.send(data);
}