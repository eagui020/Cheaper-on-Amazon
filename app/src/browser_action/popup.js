
$(document).ready(function () {
    $("#options").click(function () {
        chrome.runtime.openOptionsPage();
    });
    
    var status = "";
    var onoff;
    chrome.storage.sync.get('status', function (result) {
        status = result.status;
        if (status === null) {
            $("#onoff").prop('checked', true);
            onoff = true;
            chrome.storage.sync.set({ 'status': "on" });
            chrome.browserAction.setIcon({ path: "../../img/get_started32.png" });
        }
        else if (status === "on") {
            $("#onoff").prop('checked', true);
            onoff = true;
            chrome.browserAction.setIcon({ path: "../../img/get_started32.png" });
        }
        else
        {
            $("#onoff").prop('checked', false);
            onoff = false;
            chrome.browserAction.setIcon({ path: "../../img/off.png" });
        }
    }); 
    
    $(".slider").click(function (tab) {
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

    $("#history").click(function () {
        window.open('../history/history.html', '_blank');
    });

    $("#search").click(function() {
        var userInput = "";
        userInput = document.getElementById("searchBar").value;
        if(userInput === "") { return; } 
        var amazonUrlPrefix = "https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=";
        var url = amazonUrlPrefix + userInput;
        window.open(url);
    });
});
