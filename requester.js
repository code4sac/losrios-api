(function (requester) {
	'use strict';

	var unirest = require('unirest'); //Can I use bluebird's promisfy?
	var requestBody = require('./requestBody.js');
	
	requester.post = function (options, callback) {
		
		var reqBody = requestBody.build(options);
		
		unirest.post('http://dcs.losrios.edu/dcs_classsearch.aspx')
			.header('Content-Type', 'application/x-www-form-urlencoded')
			.send(reqBody)
			.end(callback);
	};
	
}(module.exports));