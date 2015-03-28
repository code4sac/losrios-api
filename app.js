(function () {
	'use strict';
	
	var restify = require('restify');
	var $ = require('cheerio');
	var requester = require('./requester.js');
	
	var server = restify.createServer();
	
	//api/1153/ARC/ADMJ Spring 2015
	//api/1156/SCC/ACCT Summer 2015
	server.get('/api/:semester/:college/:subject', function (req, res, next) {
		
		requester.post(req.params, function (response) {
			
			var classes = [];
			var college = '';
					
			$('#ctl00_cphMain_gvSearch tr', response.body).each(function (i, elem) {
				
//				if ($('td.GridCampus span', elem).length > 0)	{
//					college = $('td.GridCampus span', elem)[0].children[0].data.trim();
//				}

				var c = { collegeId: req.params.college };

				if ($('td.Subject div', elem).length > 0) {
					var subjects = $('td.Subject div', elem)[0].children[0].data.split('\r\n');
					c.subject = {
						code: subjects[1].trim(),
						level: subjects[2].trim(),
						type: subjects[3].trim()
					};
				}

				if ($('td.Course div', elem).length > 0) {
					c.name = $('td.Course div', elem)[0].children[1].children[0].data.trim();
					
					var href = $('td.Course div', elem)[0].children[1].attribs.href;
					href = href.substring((href.indexOf('"') + 1), href.lastIndexOf('"'));
					c.href = 'http://dcs.losrios.edu/' + href;			
				}

				if (c.subject) {
					classes.push(c);	
				}
			});
			
			res.send(200, { classes: classes });
			return next();
		});
	});
	
	server.listen(3000, function () {
		
		console.log("%s listening at %s", server.name, server.url);
	});
	
}());