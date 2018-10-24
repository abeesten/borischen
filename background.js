chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {hostEquals: 'football.fantasysports.yahoo.com', pathContains: '/1'},
				pageUrl: {hostEquals: 'football.fantasysports.yahoo.com', pathContains: '/players'},
			})
			],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}
		]);
	});
});
