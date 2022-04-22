let url = window.location.href;

if(url.includes("products_in_scene.php")) {
	//replace the url encoding
	url = url.replaceAll("%3B", ";");

	const roomPids = getPidsInUrl(url);

	let visiblePids = getPidsDisplayedOnPage();
	let hiddenPids = [];
	
	if(visiblePids.length > 0) {
		roomPids.forEach((pid) => {
			if(!visiblePids.includes(pid)) {
				hiddenPids.push(pid);
			}
		});
	}
	
	displayPids(hiddenPids);
}

function displayPids(pids) {
	let output = "";

	if(pids.length) {
		output += "Hidden Pids:";
		output += "\n";
		output += pids.join("\r\n");
	} else {
		output += "No hidden pids found";
	}
	
	alert(output);
}

/**
 * Returns an array of pids from the links on the page.
 *
 * @param {string} pisUrl The products in scene url.
 * @return {array} pids formatted.
 */
function getPidsDisplayedOnPage() {
	let links = document.querySelectorAll(".thumbnail-link");	
	let visiblePids = [];
	
	if(links.length > 0) {
		links.forEach((link) => {
			//strip array the irrelevant data leaving the pid behind
			let pid = link.href.split("products_id=")[1];

			if(pid) {
				visiblePids.push(pid);
			}
		});
	}
	
	return visiblePids;
}

/**
 * Returns an array of pids from the url.
 *
 * @param {string} pisUrl The products in scene url.
 * @return {array} pids formatted.
 */
function getPidsInUrl(pisUrl) {
	let pids = pisUrl.split('?')[1];

	if (pids.startsWith("room=")) {
		pids = pisUrl.split('&avatar')[0];
		pids = pids.replace("https://www.imvu.com/catalog/products_in_scene.php?room=", "");
		pids = pids.split(';');
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
	}

	return cleanPids(pids);
}

/**
 * Returns an array of pids with the counter removed.
 *
 * @param {array} pids The products in scene url.
 * @return {array} pids without the x counter.
 */
function cleanPids(dirtyPids) {
	let buffer = [];

	for (i = 0; i < dirtyPids.length; ++i) {
		let cleanPid = dirtyPids[i];
		if(cleanPid.includes("x")) {
			cleanPid = cleanPid.split('x')[0];
		}
		buffer.push(cleanPid);
	}

	return buffer;
}
