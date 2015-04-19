(function (data) {
	'use strict';
	
	data.save = function (semester, data) {
		
		database.getDb(function (err, db) {

			if (err) {
				console.dir(err);
			} else {
				db[semester].insert(data, function (err) {
					
					if (err) {
						console.dir(err);
					}
				});
			}
	};
	
}(module.exports));