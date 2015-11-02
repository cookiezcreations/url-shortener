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

function copyToClipboard(text) {
  window.prompt("Skopiuj do schowka: Ctrl+C, Enter", text);
}

function cookiez_injExecute() {
	if(location.protocol == "http:") {
		cookiez_httpGetAsync("http://ccr.ovh/shortenurl.php?mode=shortenurl&url=" + window.location.href, function(r) {
			if(r.lastIndexOf("id", 0) === 0) {
				var url = "http://l.ccr.ovh/" + r.substring(3);
				copyToClipboard(url);
			}
			else {
				alert(r);
			}
		});
	}
	else {
		var receiveMessage = function(event) {
		  div.removeEventListener("message", receiveMessage, false);
		  console.log(event.data);
		}
		window.addEventListener("message", receiveMessage, false);
		var newtab = window.open("http://l.ccr.ovh/innewtab.html?url=" + window.location.href);
		
		//alert("Na razie skracanie stron z HTTPS nie jest wspierane.");
	}
}