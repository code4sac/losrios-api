(function () {
	'use strict';
	
	var restify = require('restify');
	
	var server = restify.createServer();
	require('./api.js')(server);
	
	server.listen(process.env.PORT || 3000, function () {
		
		console.log("%s listening at %s", server.name, server.url);
	});
	
}());