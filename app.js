(function () {
	'use strict';
	
	var restify = require('restify');
	var requester = require('./requester.js');
	var parser = require('./parser.js');
	
	var server = restify.createServer();
	
	//api/1153/ARC/ADMJ Spring 2015
	//api/1156/SCC/ACCT Summer 2015
	server.get('/api/:semester/:college/:subject', function (req, res, next) {
		
		requester.post(req.params, function (response) {
			
			var classes = parser.parseClasses(response.body);
			
			res.send(200, { classes: classes });
			return next();
		});
	});
	
	server.listen(3000, function () {
		
		console.log("%s listening at %s", server.name, server.url);
	});
	
}());