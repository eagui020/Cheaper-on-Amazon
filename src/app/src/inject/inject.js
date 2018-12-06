chrome.storage.sync.get(null, function (result) {
    var status = result.status;
    if (status === null || status === "on") {
        if (window.location.hostname !== "smile.amazon.com" && window.location.hostname !== "www.amazon.com") {
            GetWalmartUPC(function (UPC, walPrice) {
                CompareOnAmazon(UPC, walPrice);
            });


        }
        else {
            // Check if product page
            var div = document.getElementById("unifiedPrice_feature_div");
            if (div !== null) {
                // Create element
                var button = document.createElement("button");
                button.innerHTML = "<img src='https://cagrialdemir.com.tr/wp-content/uploads/CA-Logo.png' style='height:35px; width=40px;'/>&nbsp;<b>Price History</b>";
                var urlpath = window.location.pathname.split('/');
                var ASIN = "";
                for (var i = 0; i < urlpath.length; i++) {
                    if (urlpath[i] === "dp" || urlpath[i] === "gp") {
                        if (urlpath[i + 1] === "product") {
                            ASIN = urlpath[i + 2];
                        }
                        else {
                            ASIN = urlpath[i + 1];
                        }
                        break;
                    }
                }

                GetAmazonUPC(ASIN, function (UPC, amazPrice) {
                    CompareToWalmart(UPC, amazPrice);
                });

                // Get item name
                var itemName = "";
                var titlediv = document.getElementById("productTitle");
                if (titlediv === null) {
                    itemName = "undefined";
                }
                else {
                    itemName = titlediv.innerHTML;
                    itemName = itemName.trim();
                }

                // Update our search history
                var url = [];
                var name = [];
                if (result.histUrl !== null) {
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
    }
});

function GenerateSimilarItemsAmazon() {
    var button = document.createElement("button");
    button.innerHTML = "<img src='https://cagrialdemir.com.tr/wp-content/uploads/CA-Logo.png' style='height:25px; width=40px;'/>&nbsp;<b>Search Similar Items on Amazon</b>";
    // Converted Ed's Click function for dynamic button building
    button.onclick = function () {
        var message = document.title;
        if (message.includes(" - Walmart.com")){
            message = message.replace(" - Walmart.com", "");
        }
        if (message === "") { return; }
        var amazonUrlPrefix = "https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=";
        var url = amazonUrlPrefix + message;
        window.open(url, '_blank');
    };
    button.style.height = "55px";
    button.style.length = "210px";
    button.style.fontSize = "14px";
    button.style.margin = "5px";
    button.style.backgroundColor = "lightblue";
    button.style.textAlign = "justify";

    var header;
    var div;
    header = document.getElementsByClassName("product-offer-price")[0];
    if (header === null) {
        // This is a failed attempt to inject into Target's page. They wont let me.
        div = document.createElement("div");
        div.style.zIndex = "99";
        div.style.position = "absolute";
        div.style.top = "10px";
        div.style.right = "calc(50% - 244px)";
        var parentDiv = document.getElementsByClassName("h-margin-v-tight")[0];
        parentDiv.appendChild(div);
        header = div;
        setTimeout(function () {
            header.appendChild(button);
        }, 2000);
    }
    else {
        header.appendChild(button);
    }
}

function GenerateSimilarItemsWalmart() {
    var button = document.createElement("button");
    button.innerHTML = "<img src='https://cagrialdemir.com.tr/wp-content/uploads/CA-Logo.png' style='height:25px; width=40px;'/>&nbsp;<b>Search Similar Items on Walmart</b>";
    button.onclick = function () {
        var message = document.title;
        if (message.includes("Amazon.com: ")){
            message = message.replace("Amazon.com: ", "");
            message = message.split(':')[0];
        }
        if (message === "") { return; }
        var walmartUrlPrefix = "https://www.walmart.com/search/?query=";
        var url = walmartUrlPrefix + message;
        window.open(url, '_blank');
    };
    button.style.height = "55px";
    button.style.length = "210px";
    button.style.fontSize = "14px";
    button.style.margin = "5px";
    button.style.backgroundColor = "lightblue";
    button.style.textAlign = "justify";

    var header;
    var div;
    header = document.getElementById("unifiedPrice_feature_div");
    header.appendChild(button);
}

function GetWalmartUPC(callback) {
    var SKU;
    var URL = window.location.pathname;
    SKU = URL.split('/')[3];
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myObj = JSON.parse(this.responseText);
            callback(myObj.upc, myObj.salePrice);
        }
    };
    xmlhttp.open("GET", "https://api.walmartlabs.com/v1/items/" + SKU + "?format=json&apiKey=s2rd89kpnewdjpn7y2h35wga", true);
    xmlhttp.send();
}

function CompareToWalmart(UPC, amazPrice) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myObj = JSON.parse(this.responseText);

            if (myObj.hasOwnProperty('errors')) {
                GenerateSimilarItemsWalmart();
                return;
            }
            else {
                var items = myObj.items;
                var salePrice = items[0].salePrice;
                var url = items[0].productUrl;
                var color;
                if (parseFloat(salePrice) < parseFloat(amazPrice)) {
                    //alert("Walmart better");
                    color = "green";
                }
                else {
                    //alert("Amaz better");
                    color = "red";
                }
                var button = document.createElement("button");
                button.innerHTML = "<img src='https://cagrialdemir.com.tr/wp-content/uploads/CA-Logo.png' style='height:35px; width=40px;'/>&nbsp;<b>Compared to Walmart</b>";
                button.onclick = function () {
                    window.open(url, '_blank');
                };
                button.style.height = "55px";
                button.style.length = "210px";
                button.style.fontSize = "16px";
                button.style.margin = "5px";
                button.style.backgroundColor = color;
                button.style.textAlign = "justify";
                button.title = "Walmart Price: $" + salePrice;
                button.style.color = "white";

                var header;
                header = document.getElementById("unifiedPrice_feature_div");
                header.appendChild(button);
            }
        }
    };
    xmlhttp.open("GET", "https://api.walmartlabs.com/v1/items?format=json&apiKey=s2rd89kpnewdjpn7y2h35wga&upc=" + UPC, true);
    xmlhttp.send();
}

function CompareOnAmazon(UPC, walPrice) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myObj = JSON.parse(this.responseText);

            if (myObj.item.matched_items.length === 0) {
                GenerateSimilarItemsAmazon();
                return;
            }
            else {
                var matched = myObj.item.matched_items[0];
                var salePrice = matched.new_price;
                var url = matched.url;
                var color;
                if (parseFloat(salePrice) < parseFloat(walPrice)) {
                    //alert("Amazon better");
                    color = "green";
                }
                else {
                    //alert("Walmart better");
                    color = "red";
                }
                var button = document.createElement("button");
                button.innerHTML = "<img src='https://cagrialdemir.com.tr/wp-content/uploads/CA-Logo.png' style='height:35px; width=40px;'/>&nbsp;<b>Compared to Amazon</b>";
                button.onclick = function () {
                    window.open(url, '_blank');
                };
                button.style.height = "55px";
                button.style.length = "210px";
                button.style.fontSize = "16px";
                button.style.margin = "5px";
                button.style.backgroundColor = color;
                button.style.textAlign = "justify";
                button.title = "Amazon Price: $" + salePrice; 
                button.style.color = "white";

                var header;
                header = document.getElementsByClassName("product-offer-price")[0];
                header.appendChild(button);
            }
            
        }
    };
    xmlhttp.open("GET", "https://api.barcodable.com/api/v1/upc/" + UPC, true);
    xmlhttp.send();
}

function GetAmazonUPC(ASIN, amazCallback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var myObj = JSON.parse(this.responseText);
            if (myObj.item.hasOwnProperty('upcs')) {
                amazCallback(myObj.item.upcs[0], myObj.item.new_price);
            }
            else {
                GenerateSimilarItemsWalmart();
                return;
            }
        }
    };
    xmlhttp.open("GET", "https://api.barcodable.com/api/v1/asin/" + ASIN, true);
    xmlhttp.send();
}

function GenerateFakespot() {
    // Get item name
    var itemName = "";
    var titlediv = document.getElementById("productTitle");
    if (titlediv === null) {
        itemName = "undefined";
    }
    else {
        itemName = titlediv.innerHTML;
        itemName = itemName.trim();
    }
    itemName = itemName.replace(/\/+/g, '-').replace(/\.+/g, '-').toLowerCase();
    itemName = itemName.replace(/\s+/g, '-').replace(/([^A-Za-z0-9-])+/g, "").replace(/-{2,}/g, "-").replace(/(amp-)/g, "");

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var parser = new DOMParser();
            var body = parser.parseFromString(this.responseText, "text/html");
            grade = body.getElementsByClassName("grade-box")[0].childNodes[0].innerHTML;

            var button = document.createElement("button");
            button.innerHTML = "<b><span style='font-size:32px;'>" + grade + "</span>&nbsp;Review Rating</b>";

            button.onclick = function () {
                window.open('https://www.fakespot.com/product/' + itemName, '_blank');
            };
            button.style.height = "55px";
            button.style.length = "210px";
            button.style.fontSize = "18px";
            button.style.margin = "5px";
            button.style.backgroundColor = "lightblue";
            button.style.textAlign = "justify";

            var div = document.getElementById("unifiedPrice_feature_div");

            div.appendChild(button);
        }
        else if (this.status === 404) {
            if (document.getElementById('NoReviewsFoundBtn') === null) {
                var button2 = document.createElement("button");
                button2.innerHTML = "<b>No Review Rating Found</b>";

                button2.onclick = function () {
                    window.open('https://www.fakespot.com/', '_blank');
                };
                button2.id = "NoReviewsFoundBtn";
                button2.style.height = "55px";
                button2.style.length = "210px";
                button2.style.fontSize = "20px";
                button2.style.margin = "5px";
                button2.style.backgroundColor = "lightblue";
                button2.style.textAlign = "justify";

                var div2 = document.getElementById("unifiedPrice_feature_div");

                div2.appendChild(button2);
            }
        }
    };
    xmlhttp.open("GET", 'https://www.fakespot.com/product/' + itemName, true);
    xmlhttp.send();
}