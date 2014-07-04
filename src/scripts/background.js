'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
    console.log('previousVersion', details.previousVersion);
});

chrome.extension.onRequest.addListener(function (msg, sender, sendResponse) {
	//select the text element
	var textarea = document.getElementById('tmp-clipboard');
	// now we put the message in the textarea
	textarea.value = msg.text;
	// and copy the text from the textarea
	textarea.select();
	document.execCommand('copy', false, null);
	// finally, cleanup / close the connection
	console.log(msg.text + ' copied to clipboard');
	sendResponse({});
});