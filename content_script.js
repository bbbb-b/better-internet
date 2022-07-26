// not explaining anything of this

var emojiMap = null;

fetch(chrome.runtime.getURL('res/UnicodeData.txt'))
	.then(r => r.text())
	.then(t => emojiMap = t.split("\n").map(t => t.split(";")).reduce((o, v) => (o[v[0].toUpperCase()] = v[1], o), {}))

const emojiToText = hex => `<${emojiMap[hex].replaceAll(" ", "_") || `MISSING (${hex})`}>`

function fixShitTwitter() {
	if (!emojiMap) 
		return;
	[].slice.call(document.getElementsByTagName("img"))
		.filter(f => new URL(f.src).pathname.indexOf("emoji") != -1)
		.forEach(img => {
			var hex = new URL(img.src).pathname.split("/").slice(-1)[0].split(".")[0].toUpperCase()
			var text = hex.split("-").map(h => emojiToText(h)).join("");
			console.log(`Replaced ${img.src} ${hex} with ${text}`);
			img.parentElement.replaceChild(document.createTextNode(text), img);
	});
}

function fixShit() {
	fixShitTwitter()
}

setInterval(fixShit, 100);
