(function () {
	'use strict';

	var scraper = require('./scraper.js');
	
	module.exports = function (server) {
		
		//api/1153/ARC/ADMJ Spring 2015
		//api/1156/SCC/ACCT Summer 2015
		server.get('/api/:semester/:college/:subject', function (req, res, next) {

				scraper.scrape(req.params, function (data) {
				
				res.send(200, { classes: data });
				next();	
			});
		});
		
		server.get('/all/:semester', function (req, res, next) {

			var semester = req.params.semester;

			scraper.scrapeAll(semester, function (message) {

				res.send(200, { message: message });
				return next();
			});
		});
	};
	
}());