
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
        
        //store search in history
        var urlH = [];
        var nameH = [];
        chrome.storage.sync.get(null, function(result) {
            urlH = result.searchHistUrl;
            nameH = result.searchHistName;

            if(urlH.length < 10) { // only store last 10 searches
                urlH.unshift(url);
                nameH.unshift(userInput);
            }
            else { //pop oldest search before saving new search
                urlH.pop();
                nameH.pop();
                urlH.unshift(url);
                nameH.unshift(userInput);
            }

            chrome.storage.sync.set({ 'searchHistUrl': urlH});
            chrome.storage.sync.set({ 'searchHistName': nameH});
        });
        
        window.open(url);
    });
});
