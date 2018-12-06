chrome.storage.sync.get(null, function (result) {
	if(result.histUrl.length == 0) {
		var PriceHistoryBtn = document.getElementById('testDiv');
		PriceHistoryBtn.className="d-none";

		var div = document.createElement('div');
		div.className = "card w-50 mx-auto";
		div.innerHTML = "<div class='card-body'><a style='display: block; text-align: center; text-decoration: none;'>Nothing to show here.</a></div>";
		document.getElementById("PriceHistoryAnchor").appendChild(div);
	}
	else {
		var PriceHistoryBtn = document.getElementById('testDiv');
		PriceHistoryBtn.className="card w-50 mx-auto";
		for(var i = 0; i < result.histUrl.length; ++i)
		{
			// Get all history
			var histUrl = result.histUrl[i];
			var histName = result.histName[i];

			// Dynamically create search history list
			var div = document.createElement('div');
			div.className = "card w-50 mx-auto";
			div.innerHTML = "<div class='card-body'> <a href='" + histUrl + "' style='display: block; text-align: center; text-decoration: none;'>" + histName + "</a> </div>";
			document.getElementById("pricehistory").appendChild(div);
		}

	}

	// fetch search history
	if(result.searchHistUrl.length == 0) {
		var SearchHistBtn = document.getElementById('test2Div');
		SearchHistBtn.className="d-none";

		var div = document.createElement('div');
		div.className = "card w-50 mx-auto";
		div.innerHTML = "<div class='card-body'><a style='display: block; text-align: center; text-decoration: none;'>Nothing to show here.</a></div>";
		document.getElementById("SearchHistoryAnchor").appendChild(div);
	}
	else {
		var SearchHistBtn = document.getElementById('test2Div');
		SearchHistBtn.className="card w-50 mx-auto";

		for(var i = 0; i < result.searchHistUrl.length; ++i)
		{
			var searchHistUrl = result.searchHistUrl[i];
			var searchHistName = result.searchHistName[i];

			var div = document.createElement('div');
			div.className = "card w-50 mx-auto";
			div.innerHTML = "<div class='card-body'> <a href='" + searchHistUrl + "' style='display: block; text-align: center; text-decoration: none;'>" + searchHistName + "</a> </div>"
			document.getElementById("searchhistory").appendChild(div);
		}

	}
}); 

// Clear history
// var clear = document.getElementById("clearhistory");

$("#clearhistory").click(function () { 
	chrome.storage.sync.set({ 'histUrl': [] });
	chrome.storage.sync.set({ 'histName': [] });
	location.reload();
});

// clear search history
// var clearSearch = document.getElementById("clearSearch");

$("#clearSearch").click(function() {
	chrome.storage.sync.set({ 'searchHistUrl': [] });
	chrome.storage.sync.set({ 'searchHistName': [] });
	location.reload();
});