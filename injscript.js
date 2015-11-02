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

function cookiez_copyToClipboard(text) {
  window.prompt("Skopiuj do schowka: Ctrl+C, Enter", text);
}

function cookiez_injExecute() {
	if(location.protocol == "http:") {
		cookiez_httpGetAsync("http://ccr.ovh/shortenurl.php?mode=shortenurl&url=" + window.location.href, function(r) {
			if(r.lastIndexOf("id", 0) === 0) {
				var url = "http://l.ccr.ovh/" + r.substring(3);
				cookiez_copyToClipboard(url);
			}
			else {
				alert(r);
			}
		});
	}
	else {
		var cookiez_receiveMessage = function(event) {
		  window.removeEventListener("message", cookiez_receiveMessage, false);
		  console.log(event.data);
		  console.log("ORIGIN: " + event.origin);
		}
		
		var cookiez_xd_div = document.createElement('div');
		cookiez_xd_div.style.zIndex = '66666';
		cookiez_xd_div.style.position = 'absolute';
		cookiez_xd_div.style.top = '0';
		cookiez_xd_div.style.left = '0';
		cookiez_xd_div.style.bottom = '0';
		cookiez_xd_div.style.right = '0';
		cookiez_xd_div.backgroundColor = 'green';
		document.body.insertBefore(cookiez_xd_div, document.body.firstChild);
		//document.body.appendChild(div);
		
		window.addEventListener("message", cookiez_receiveMessage, false);
		var cookiez_xd_newtab = window.open("http://l.ccr.ovh/innewtab.html?url=" + window.location.href);
		
		//alert("Na razie skracanie stron z HTTPS nie jest wspierane.");
	}
}