(function (scraper) {
	'use strict';
	
	var requester = require('./requester.js');
	var parser = require('./parser.js');
	var subjectCodes = require('./subjectCodes.js');
	var scrapeInProgress = false;
	
	scraper.scrape = function (options, next) {
		
		requester.post(options, function (response) {

			var classes = parser.parseClasses(response.body);
			
			next(classes);
		});
	};
	
	scraper.scrapeAll = function (options, next) {
		
		if (scrapeInProgress) {
			next("Scrape already in progress");
		} else {
			scrapeInProgress = true;
			
			subjectCodes.forEach(function (subjectCode) {
				
				options.subject = subjectCode;
				
				requester.post(options, function (response) {
					
					var classes = parser.parseClasses(response.body);
					
					console.log(subjectCode + ": " + classes.length);
				});
			});
			
			next("Scrape started");
		}
	};
	
}(module.exports));