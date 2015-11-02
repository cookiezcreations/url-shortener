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
			if(event.origin.lastIndexOf("http://l.ccr.ovh", 0) === 0) {
				window.removeEventListener("message", cookiez_receiveMessage, false);
				  console.log(event.data);
				  console.log("ORIGIN: " + event.origin);
			}
		}
		
		var cookiez_xd_div_name = "cookiez_confirm_overlay_xd";
		var cookiez_xd_div = document.createElement('div');
		cookiez_xd_div.style.zIndex = '2147483647';
		cookiez_xd_div.style.position = 'absolute';
		cookiez_xd_div.style.top = '0';
		cookiez_xd_div.style.left = '0';
		cookiez_xd_div.style.bottom = '0';
		cookiez_xd_div.style.right = '0';
		cookiez_xd_div.backgroundColor = 'rgba(70, 70, 70, 70)';
		cookiez_xd_div.textAlign = "center";
		cookiez_xd_div.verticalAlign = "middle";
		cookiez_xd_div.lineHeight = "100vh";
		cookiez_xd_div.id = cookiez_xd_div_name;
		cookiez_xd_div.className = cookiez_xd_div_name;
		cookiez_xd_div.onclick = function() {
			window.addEventListener("message", cookiez_receiveMessage, false);
			var cookiez_xd_newtab = window.open("http://l.ccr.ovh/innewtab.html?url=" + window.location.href);
		};
		document.body.insertBefore(cookiez_xd_div, document.body.firstChild);
		
		//alert("Na razie skracanie stron z HTTPS nie jest wspierane.");
	}
}