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