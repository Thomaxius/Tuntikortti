const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('workdays.db');

db.serialize(function() {
 
	const tables = {	
			workdays: 
						"CREATE TABLE workdays" + 
							"(" +
								"workday_begin text," +
								"workday_end text," +
								"vehicle text DEFAULT '-'," +
								"akaa_amount integer DEFAULT 0," +
								"fazer_amount integer DEFAULT 0," +
								"kesko_amount integer DEFAULT 0," +
								"merca_amount integer DEFAULT 0," +
								"messi_amount integer DEFAULT 0," +
								"pahvit_amount integer DEFAULT 0," +
								"paulig_amount integer DEFAULT 0," +
								"other_amount integer DEFAULT 0," +
								"other_info text DEFAULT '-'," +
								"urakka integer DEFAULT 0" + // Boolean True\False
							")",
			tohoilyt: 
						"CREATE TABLE tohoilyt" +
						"(" +
								"date text," +
								"time text," +
								"severity text," +
								"delay integer," +
								"description text"+
						")",
			sleep:
						"CREATE TABLE sleepdata" +
						"(" +
								"sleep_from_date text," +
								"sleep_to_date text," +
								"light_s integer," +
								"deep_s integer," +
								"rem_s integer," +
								"awake_s integer," +
								"wake_up_s integer," +
								"duration_to_sleep_s integer," +
								"duration_to_wake_up_s integer," +
								"snoring_s integer," +
								"snoring_episodes_s integer," +
								"average_heart_rate_s integer," +
								"heart_rate_min_s integer," +
								"heart_rate_max_s integer" +
						")",
			nutrition:					
						"CREATE TABLE nutrition" +
						"(" +
								"date text," +
								"meal text," +
								"calories integer," +
								"fatGrams integer," +
								"saturatedFat integer," +
								"polyunsaturatedFat integer," +
								"monounsaturatedFat integer," +
								"transFat integer," +
								"cholesterol integer," +
								"sodiumMilgrams integer," +
								"potassium integer," +
								"carbohydratesGrams integer," +
								"fiber integer," +
								"sugar integer," +
								"proteinGrams integer," +
								"vitaminA integer," +
								"vitaminC integer," +
								"calcium integer," +
								"iron integer," +
								"note text" +					
						")",
			steps: 						
						"CREATE TABLE steps" +
						"(" +
								"date text," +
								"steps integer" +	
						")",
					
								}

	Object.keys(tables).forEach((table) => 
		db.run(tables[table], ((err) => {
			if (err) {
				return console.log(err.message);
			}
			console.log("Table \"" + table + "\" created");
		})
	))



	db.close();
});
