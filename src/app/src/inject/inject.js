chrome.storage.sync.get(null, function (result) {
    var status = result.status;
    if (status === null || status === "on") {
        // Check if product page
        var div = document.getElementById("unifiedPrice_feature_div");
        if (div != null) {

            // Create element
            var button = document.createElement("button");
            button.innerHTML = "<img src='https://cagrialdemir.com.tr/wp-content/uploads/CA-Logo.png' style='height:35px; width=40px;'/>&nbsp;<b>Price History</b>";
            var urlpath = window.location.pathname.split('/');
            var ASIN = "";
            for (var i = 0; i < urlpath.length; i++) {
                if (urlpath[i] == "dp" || urlpath[i] == "gp") {
                    if (urlpath[i + 1] == "product") {
                        ASIN = urlpath[i + 2];
                    }
                    else {
                        ASIN = urlpath[i + 1];
                    }
                    break;
                }
            }

            // Get item name
            var itemName = "";
            var titlediv = document.getElementById("productTitle");
            if (titlediv == null) {
                itemName = "undefined"
            }
            else {
                itemName = titlediv.innerHTML;
                itemName = itemName.trim();
            }

            // Update our search history
            var url = [];
            var name = [];
            if (result.histUrl != null) {
                url = result.histUrl;
                name = result.histName;
                if (!url.includes('https://camelcamelcamel.com/product/' + ASIN)) {
                    if (url.length < 10) {
                        url.unshift('https://camelcamelcamel.com/product/' + ASIN);
                        name.unshift(itemName);
                    }
                    else {
                        url.pop();
                        name.pop();
                        url.unshift('https://camelcamelcamel.com/product/' + ASIN);
                        name.unshift(itemName);
                    }
                }
            }
            else {
                url.unshift('https://camelcamelcamel.com/product/' + ASIN);
                name.unshift(itemName);
            }

            // Store our history and show price history
            button.onclick = function () {
                window.open('https://camelcamelcamel.com/product/' + ASIN, '_blank');
                var history = result.history;
                if (history == null || history == "on") {
                    chrome.storage.sync.set({ 'histUrl': url });
                    chrome.storage.sync.set({ 'histName': name });
                }
            };
            button.style.height = "55px";
            button.style.length = "210px";
            button.style.fontSize = "20px";
            button.style.margin = "5px";
            button.style.backgroundColor = "lightblue";
            button.style.textAlign = "justify";

            // Append to somewhere on page
            div.appendChild(button);

            GenerateFakespot();
        }
    }
});
//Change to onClick
$("#buttonId").click(function() {
		var message;
		message = document.title;
        if(message == "") { return; } 
        var amazonUrlPrefix = "https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=";
        var url = amazonUrlPrefix + message;
        window.open(url);
});

function GenerateFakespot() {
    // Get item name
    var itemName = "";
    var titlediv = document.getElementById("productTitle");
    if (titlediv == null) {
        itemName = "undefined"
    }
    else {
        itemName = titlediv.innerHTML;
        itemName = itemName.trim();
    }
    itemName = itemName.replace(/\/+/g, '-').replace(/\.+/g, '-').toLowerCase();
    itemName = itemName.replace(/\s+/g, '-').replace(/([^A-Za-z0-9-])+/g, "").replace(/-{2,}/g, "-").replace(/(amp-)/g, "");
    var button = document.createElement("button");
    button.innerHTML = "<img src='https://cagrialdemir.com.tr/wp-content/uploads/CA-Logo.png' style='height:35px; width=40px;'/>&nbsp;<b>Review Rating</b>";

    button.onclick = function () {
        window.open('https://www.fakespot.com/product/' + itemName, '_blank');
    };
    button.style.height = "55px";
    button.style.length = "210px";
    button.style.fontSize = "20px";
    button.style.margin = "5px";
    button.style.backgroundColor = "lightblue";
    button.style.textAlign = "justify";

    var div = document.getElementById("unifiedPrice_feature_div");

    div.appendChild(button);
}