(function () {
	'use strict';

	var scraper = require('./scraper.js');
	
	module.exports = function (server) {
		
		//api/1153/ARC/All Spring 2015
		//api/1159/All/All All Fall 2015
		server.post('/api/:semester/:college/All', function (req, res, next) {

			if (req.headers.authorization === process.env.auth_token) {
				var semester = req.params.semester;

				scraper.scrapeAll(req.params, function (message) {

					res.send(200, { message: message });
					return next();
				});
			} else {
				res.send(404, { message: "Did you get lost?" });
				return next();
			}
		});
		
		//api/1153/ARC/ADMJ Spring 2015
		//api/1156/SCC/ACCT Summer 2015
		server.get('/api/:semester/:college/:subject', function (req, res, next) {

				scraper.scrape(req.params, function (data) {
				
				res.send(200, { classes: data });
				next();	
			});
		});
	};
	
}());