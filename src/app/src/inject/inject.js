chrome.storage.sync.get(null, function (result) {
    var status = result.status;
    if (status === null || status === "on") {
        // Check if product page
        var div = document.getElementById("unifiedPrice_feature_div");
        if (div != null) {
            // Create element
            var button = document.createElement("button");
            button.innerHTML = "<img src='https://cagrialdemir.com.tr/wp-content/uploads/CA-Logo.png' style='height:40px; width=40px;'/>&nbsp;<b>Price History</b>";
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
			if (titlediv == null)
			{
				itemName = "undefined"
			}
			else
			{
				itemName = titlediv.innerHTML;
				itemName = itemName.trim();
			}
			
			// Update our search history
			var url = [];
			var name = [];
			if(result.histUrl != null)
			{
				url = result.histUrl;
				name = result.histName;
				if(!url.includes('https://camelcamelcamel.com/product/' + ASIN))
				{
					if(url.length < 10)
					{
						url.unshift('https://camelcamelcamel.com/product/' + ASIN);
						name.unshift(itemName);
					}
					else
					{
						url.pop();
						name.pop();
						url.unshift('https://camelcamelcamel.com/product/' + ASIN);
						name.unshift(itemName);
					}
				}
			}
			else
			{
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
            button.style.height = "75px";
            button.style.length = "210px";
            button.style.fontSize = "24px";
            button.style.margin = "5px";
            button.style.backgroundColor = "lightblue";
            button.style.textAlign = "justify";

            // Append to somewhere on page
            div.appendChild(button);
        }
    }
}); 