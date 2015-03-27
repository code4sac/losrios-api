(function () {
	'use strict';
	
	var restify = require('restify');
	var $ = require('cheerio');
	var requester = require('./requester.js');
	
	var server = restify.createServer();
	
	//1153/ARC/ADMJ Spring 2015
	//1156/SCC/ACCT Summer 2015
	server.get('/:semester/:college/:subject', function (req, res, next) {
		
		requester.post(req.params, function (response) {
					
			$('#ctl00_cphMain_gvSearch tr', response.body).each(function (i, elem) {

				if ($('td.Subject div', elem).length > 0) {
					console.dir($('td.Subject div', elem)[0].children[0].data.trim());
				}

				if ($('td.Course div', elem).length > 0) {
					console.dir($('td.Course div', elem)[1].children[0].data.trim());
				}

				if ($('td.GridCampus span', elem).length > 0)	{
					console.dir($('td.GridCampus span', elem)[0].children[0].data.trim());
				}
			});
			
			res.send(200, "OK!");
			return next();
		});
	});
	
	server.listen(3000, function () {
		
		console.log("%s listening at %s", server.name, server.url);
	});
	
}());