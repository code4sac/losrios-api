(function (database) {
	'use strict';

	var mongodb = require("mongodb");
	var env = require('./env.js');
	
	var mongoUrl = process.env.MONGODB || env.MONGODB;
	var theDb = null;

	database.getDb = function (next) {

		if (!theDb) {
			mongodb.MongoClient.connect(mongoUrl, function (err, db) {

				if (err) {
					next(err, null);
				} else {
					theDb = db;

					next(null, theDb);
				}
			});
		} else {
			next(null, theDb);
		}
	};

} (module.exports));