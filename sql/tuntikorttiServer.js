const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(cors());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('workdays.db');

app.listen(8080, function () {
    console.log('Node toimii localhost:8080');
});

app.get('/', function (req, res) {
    return res.send({ error: false, message: 'Toimii' })
});

app.get('/workdays/all', function (req, res) {
	db.all('select * from workdays', function (error, result) {
		if (error) {
			throw error;
		}
		return res.status(200).send(result);
	});
})

app.get('/matka/one/:id', function (req, res) {
	let id = req.params.id;
	
    db.get("select * from workdays where id=?", [id], function (error, result) {
		if (error) {
			throw error;
		}
		
		// annetulla id:llä ei ole riviä
		if (typeof(result) == "undefined") {
			return res.status(200).send({});
		}
		
		return res.status(200).send(result);
		
	});
})

app.post('/workday/add', function (req, res) {
	let matka = req.body;
	
    db.run("insert into `workdays` (`id`, `day_begin`, `day_end`, `hours`, `car`, `paulig_amount`, `fazer_amount`, `merca_amount`, `messi_amount`, `pahvit_amount`, `akaa_amount`, other) values (?,?,?,?,?,?)", 
	[workday.id, workday.day_begin, workday.day_end, workday.hours, workday.car, workday.paulig_amount, workday.fazer_amount, workday.merca_amount, workday.messi_amount, workday.pahvit_amount, workday.akaa_amount, workday.other], 
	function (error, result) {
		if (error) {
			throw error;
		}
		return res.status(200).send();
	}); 
})
 
app.get('/matka/delete/:id', function (req, res) {
	let id = req.params.id;
	
    db.run("delete from matka where id=?", [id], function (error, result) {
		if (error) {
			throw error;
		}

		return res.status(200).send({count: this.changes});
	});   
})

app.get('*', function (req, res) {
    return res.status(404).send({ error: true, message: 'Ei pyydettyä palvelua' })
})


