chrome.storage.sync.get(null, function (result) {
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

	// fetch search history
	for(var i = 0; i < result.searchHistUrl.length; ++i)
	{
		var searchHistUrl = result.searchHistUrl[i];
		var searchHistName = result.searchHistName[i];

		var div = document.createElement('div');
		div.className = "card w-50 mx-auto";
		div.innerHTML = "<div class='card-body'> <a href='" + searchHistUrl + "' style='display: block; text-align: center; text-decoration: none;'>" + searchHistName + "</a> </div>"
		document.body.appendChild(div);
	}
}); 

// Clear history
var clear = document.getElementById("clearhistory");

clear.onclick = function () { 
	chrome.storage.sync.set({ 'histUrl': [] });
	chrome.storage.sync.set({ 'histName': [] });
	location.reload();
};

// clear search history
var clearSearch = document.getElementById("clearSearch");

clearSearch.onclick = function() {
	chrome.storage.sync.set({ 'searchHistUrl': [] });
	chrome.storage.sync.set({ 'searchHistName': [] });
	location.reload();
};