(function (scraper) {
	'use strict';
	
	var requester = require('./requester.js');
	var parser = require('./parser.js');
	var scrapeInProgress = false;
	
	scraper.scrape = function (options, next) {
		
		requester.post(options, function (response) {

			var classes = parser.parseClasses(response.body);
			
			next(classes);
		});
	};
	
	scraper.scrapeAll = function (semester, next) {
		
		if (scrapeInProgress) {
			next("Scrape already in progress");
		} else {
			scrapeInProgress = true;
			
			
			next("Scrape started");
		}
	};
	
}(module.exports));