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

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  var namee = "cookiez_copyinp";
  textArea.id = namee;
  textArea.className = namee;
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'udane' : 'nieudane';
    console.log('Kopiowanie tekstu ' + msg);
  } catch (err) {
    alert('Ups, nie można skopiować.');
  }

  document.body.removeChild(textArea);
}

dictionary ClipboardEventInit : EventInit {
    DOMString data = "";
    DOMString dataType = "";
};

function cookiez_injExecute() {
	if(location.protocol == "http:") {
		cookiez_httpGetAsync("http://ccr.ovh/shortenurl.php?mode=shortenurl&url=" + window.location.href, function(r) {
			if(r.lastIndexOf("id", 0) === 0) {
				var url = "http://l.ccr.ovh/" + r.substring(3);
				var copyEvent = new ClipboardEvent('copy', { dataType: 'text/plain', data: url} );
				document.dispatchEvent(copyEvent);
				//copyTextToClipboard(url);
			}
			else {
				alert(r);
			}
		});
	}
	else {
		alert("Na razie skracanie stron z HTTPS nie jest wspierane.");
	}
}