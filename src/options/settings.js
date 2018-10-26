$(document).ready(function () {

    var status = "";
    var onoff;
    chrome.storage.sync.get('status', function (result) {
        status = result.status;
        if (status == null || status == "on") {
            $("#onoff").prop('checked', true);
            onoff = true;
            chrome.browserAction.setIcon({ path: "../../img/get_started32.png" });
        }
        else {
            $("#onoff").prop('checked', false);
            onoff = false;
            chrome.browserAction.setIcon({ path: "../../img/off.png" });
        }
    });

    $(".onoff").click(function (tab) {
        if ($("#onoff").prop('checked')) {
            onoff = false;
        }
        else {
            onoff = true;
        }
        if (!onoff) {
            chrome.storage.sync.set({ 'status': "off" });
            chrome.browserAction.setIcon({ path: "../../img/off.png", tabId: tab.id });
        }
        else {
            chrome.storage.sync.set({ 'status': "on" });
            chrome.browserAction.setIcon({ path: "../../img/get_started32.png", tabId: tab.id });
        }
    });
	
	var history = "";
    var savehistory;
	chrome.storage.sync.get('history', function (result) {
        history = result.history;
        if (history == null || history == "on") {
            $("#savehistory").prop('checked', true);
            savehistory = true;
        }
        else {
            $("#savehistory").prop('checked', false);
            savehistory = false;
        }
    });

    $(".savehistory").click(function (tab) {
        if ($("#savehistory").prop('checked')) {
            savehistory = false;
        }
        else {
            savehistory = true;
        }
        if (!savehistory) {
            chrome.storage.sync.set({ 'history': "off" });
        }
        else {
            chrome.storage.sync.set({ 'history': "on" });
        }
    });
});