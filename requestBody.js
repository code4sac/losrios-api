(function (requestBody) {
	'use strict';
	
	var util = require('util');
	var requestBodies = require('./requestBodies.js');
	
	requestBody.build = function (options) {
		
		return util.format(requestBodies[options.semester], options.college, options.subject);
	};
	
}(module.exports));