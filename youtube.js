

function isBadLength(str, maxLength) {
	str = str.trim()
	isBad = false;
	if (str.includes(":")) {
		var vals = str.split(":").map(x => (parseInt(x) || 0))
		length = vals[vals.length-1] + vals[vals.length-2] * 60 + (vals[vals.length-3] || 0) * 60 * 60;
		if (length <= maxLength)
			isBad = true;
	}
	if (str === "SHORTS")
		isBad = true;

	return isBad;

}
function removeVideos(maxLength) {
	// selector: ytd-video-renderer and ytd-rich-item-renderer
	// normal
	var selectors = ["ytd-video-renderer", "ytd-rich-item-renderer", ".ytd-grid-renderer"]
	var badVideos = selectors.map(selector => {
		var videoLengths = Array.from(document.querySelectorAll(`${selector} .ytd-thumbnail-overlay-time-status-renderer`));
		var badVideos = videoLengths.filter(x => isBadLength(x.textContent, maxLength)).map(x => x.closest(`${selector}`));
		return badVideos;
	}).reduce((a, b) => a.concat(b));
	for (var badVideo of badVideos) {
		console.log(`"Removing:\n${badVideo.textContent}`);
		badVideo.remove()
	}
}


var mx = 60 * 2; // 2 minutes

setInterval(() => removeVideos(mx), 300); // 0.1 sec
