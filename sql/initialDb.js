const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('workdays.db');

db.serialize(function() {
 
	let sql = "CREATE TABLE workdays (" +
			  "id integer PRIMARY KEY NOT NULL, " +
			  "day_begin date NOT NULL, " +
			  "day_end date NOT NULL, " +
			  "hours integer NOT NULL, " +
			  "car text," +
				"paulig_amount integer DEFAULT 0, " +
				"fazer_amount integer DEFAULT 0, " +
				"merca_amount integer DEFAULT 0, " +
				"messi_amount integer DEFAULT 0, " +
				"pahvit_amount integer DEFAULT 0, " +
				"akaa_amount integer DEFAULT 0, " +
				"other text)";

	db.run(sql, function(err) {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Database created");
	});

	sql = "INSERT INTO `workdays` (`id`, `day_begin`, `day_end`, `hours`, `car`, `paulig_amount`, `fazer_amount`, `merca_amount`, `messi_amount`, `pahvit_amount`, `akaa_amount`, other) " +
	" VALUES (1, '2018-08-15', '2018-08-15', 15, 'CKC', 1, 0, 0, 0, 1, 0, 'test')";
	db.run(sql, function(err) {
		if (err) {
		  return console.log(err.message);
		}
		console.log("Added a row");
	});

	db.close();
});
