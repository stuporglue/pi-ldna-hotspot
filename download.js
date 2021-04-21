// Handle form submit. Just add the item to the queue
function formsubmit() {
	var inputurl = document.querySelector('#INPUTURL');

	// Handle whatever weird is going on
	var tbody = document.querySelector('#queue tbody');
	if ( tbody === null ){
		document.querySelector('#queue').insertAdjacentHTML('beforeend','<tbody></tbody');
	}

	document.querySelector('#queue tbody').insertAdjacentHTML('beforeend','<tr class="queuerow"><td class="url">' + inputurl.value + '</td><td class="deletebutton">ⓧ</td></tr>');
	inputurl.value = '';

	processQueue();

	return false;
}

// Handle all click events
document.addEventListener('click', function (e) {
	if ( e.target.matches('.deletebutton') ) {
		e.target.parentElement.parentElement.removeChild(e.target.parentElement);
	} else if ( e.target.matches('.url') ) {
		window.open(e.target.innerText, '_blank');
	}
}, false);

// Handle all click events
document.addEventListener('DOMContentLoaded', function (e) {
	console.log("Set up timer");
	window.setInterval(checkIframeLoaded,2000);
}, false);



// Process the queue
function processQueue(){
	if ( !iframeReady() ) {
		return;
	}

	var queue = document.querySelector('#queue tbody');
	var queueitem = queue.lastChild;

	if (queueitem.childElementCount > 0 ) {
		queue.removeChild(queueitem);
		var theurl = queueitem.querySelector('td.url').innerText;
		document.querySelector('#THEURL').value = theurl;
		document.querySelector('#currenturl').innerHTML = theurl;
		document.querySelector('#realform').submit();
		document.querySelector('#THEURL').value = '';
	}
}

// Handler to keep checking iframe loading status
function checkIframeLoaded() {
	console.log("Checking iframe");
	// Check if loading is complete
	if (  iframeReady() ){
		processQueue();
		return;
	} 
}

function iframeReady() {
	var iframe = document.getElementById('outputframe');
	var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
	return iframeDoc.readyState == 'complete';
}
