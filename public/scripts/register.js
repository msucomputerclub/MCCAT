var cwid = readCookie("cwid");
cwid=cwid.match(/(^;\d{9}(?:=))|(^M\d+)|(^\d{8,9})/g)[0]
.replace(/\D/g, "")
.replace(/^0+/g, "")
.trim();
document.getElementById('inputcwid').value=cwid;

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}