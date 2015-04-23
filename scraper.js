(function (scraper) {
	'use strict';
	
	var requester = require('./requester.js');
	var parser = require('./parser.js');
	var subjectCodes = require('./subjectCodes.js');
	var data = require('./data.js');
	var env = require('./env.js');
	var scrapeInProgress = false;
	
	scraper.scrape = function (options, next) {
		
		requester.post(options, function (response) {

			var classes = parser.parseClasses(response.body);
			
			next(classes);
		});
	};
	
	scraper.scrapeAll = function (options, next) {
			
		subjectCodes.forEach(function (subjectCode) {

			options.subject = subjectCode;

			requester.post(options, function (response) {

				var classes = parser.parseClasses(response.body);

				var persist = process.env.PERSIST || env.PERSIST || false;
				if (classes.length > 0 && persist) {
					try {
						data.save(options.semester, subjectCode, classes);
					} catch (ex) {
						console.log(ex);
					}

				} else {
					console.log(subjectCode + ": " + classes.length);
				}
			});
		});

		next("Scrape started");
	};
	
}(module.exports));