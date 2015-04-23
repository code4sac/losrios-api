(function (data) {
	'use strict';
	
	var database = require('./database.js');
	
	data.save = function (semester, subject, data) {
		
		database.getDb(function (err, db) {

			if (err) {
				console.dir(err);
			} else {
				
				var collection = semester + '-' + subject;
				db.collection(collection).insert(data, function (err) {
					
					if (err) {
						console.dir(err);
					} else {
						console.log("Persisted: " + collection);
					}
					
				});
			}
		});
	};
	
}(module.exports));