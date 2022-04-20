let url = window.location.href;

if(url.includes("products_in_scene.php")) {
	//replace the url encoding
	url = url.replaceAll("%3B", ";");
	
	const roomPids = getRoomPids(url);	
	
	//grab all of the product links on the page
	const links = document.querySelectorAll(".thumbnail-link");
	let hiddenPids = [];

	if(links.length > 0) {
		links.forEach((link) => {
			//strip array the irrelevant data leaving the pid behind
			let pid = link.href.split("products_id=")[1];
			
			if(pid) {
				//if the pid exists in the url
				if(roomPids.includes(pid)) {
					//change the opacity of the link to indicate we don't care about it
					link.style.opacity = .5;
				} else {
					hiddenPids.push(pid);
				}
			}
		});
	}
	
	console.log(hiddenPids);
}


/**
 * Returns an array of pids.
 *
 * @param {string} pisUrl The products in scene url.
 * @return {array} pids formatted.
 */
function getRoomPids(pisUrl) {
	let pids = pisUrl.split('?')[1];

	if (pids.startsWith("room=")) {
		pids = pisUrl.split('&avatar')[0];
		pids = pids.replace("https://www.imvu.com/catalog/products_in_scene.php?room=", "");
		pids = pids.split(';');
		return pids;

	} else if (pids.startsWith("avatar")) {
		let urlParts = pids.split('&');
		for (i = 0; i < urlParts.length; ++i) {
			if(urlParts[i].startsWith("room=")) {
				pids = urlParts[i];
				break;
			}
		}
		pids = pids.replace("room=", "");
		pids = pids.split(';');
		return cleanPids(pids);
	}
}

/**
 * Returns an array of pids with the counter removed.
 *
 * @param {array} pids The products in scene url.
 * @return {array} pids without the x counter.
 */
function cleanPids(pids) {
	let buffer = [];

	for (i = 0; i < pids.length; ++i) {
		let cleanPid = pids[i];
		if(cleanPid.includes("x")) {
			cleanPid = cleanPid.split('x')[0];
		}
		buffer.push(cleanPid);
	}

	return buffer;
}
