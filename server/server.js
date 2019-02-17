import express from 'express'
import Loadable from 'react-loadable'
import db from './db'
import indexController from './controllers/serverController'
import utils from "../src/utils"
let bodyParser = require('body-parser')
const PORT = 3000

// initialize the application and create the routes
const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}))

app.post('/addworkdays', async (req, res) => {
    let result = null
    if (utils.isValidRequest(req, 'workdays')) {
        for (const workdayObject of req.body.params.workdays) { // TIL You can't use foreach with async\await
            if (!utils.isValidWorkdayObj(workdayObject)) { // Validate each object
                res.sendStatus(400)
                return
            }
            result = await db.addWorkday(workdayObject)
        }
        if (result) {
            res.sendStatus(200)
            return
        }
        else {
            res.sendStatus(500)
            return
        }
    }
    else {
        res.sendStatus(500)
        return
    }
})

app.post('/addtohoily', async (req, res) => {
    const result = await db.addTohoily(req.body.params.tohoily)
})

app.post('/getalldata', async (req, res) => {
    if (req.body.params) {
        if (req.body.params.startDate && req.body.params.endDate) {
            if (!utils.datesAreValid(req.body.params.startDate, req.body.params.endDate)) { // Validate object so one cannot post malicious data
                res.sendStatus(400)
                return
            }
        }
        const resultObj = await db.getWorkdaysAndTohoilyt(req.body.params.startDate, req.body.params.endDate)
        res.status(200).send(resultObj)
    }
    else {
        res.sendStatus(400)
    }
})


app.post('/checkforoverlap', async (req, res) => {
    const result = await db.getAllWorkdays()
    const resultObj = utils.workdayOverlaps(result, req.body.params.workday) // Check if posted workday overlaps with the ones in the database
    if (resultObj['error'] === true) {
        res.status(400).send(resultObj['conflictingWorkday'])
    }
    else {
        res.sendStatus(200)
    }
})

app.post('/getworkdaychartdata', async (req, res) => {
    if (req.body.params) {
        if (req.body.params.startDate && req.body.params.endDate) {
            if (!utils.datesAreValid(req.body.params.startDate, req.body.params.endDate)) { // Validate object so one cannot post malicious data
                res.sendStatus(400)
                return
            }
        }
        const result = await db.getDataForWorkdayChart(req.body.params.startDate, req.body.params.endDate)
        res.status(200).send(result)
    }
    else {
        res.sendStatus(400)
    }
})


app.post('/getaveragechart', async (req, res) => {
    if (req.body.params) {
        if (req.body.params.startDate && req.body.params.endDate) {
            if (!utils.datesAreValid(req.body.params.startDate, req.body.params.endDate)) { // Validate object so one cannot post malicious data
                res.sendStatus(400)
                return
            }
        }
        const result = await db.getDataForWeekdayAverageChart(req.body.params.startDate, req.body.params.endDate)
        res.status(200).send(result)
    }
    else {
        res.sendStatus(400)
    }
})


app.post('/getrandomchartdata', async (req, res) => {
    if (req.body.params) {
        if (req.body.params.startDate && req.body.params.endDate) {
            if (!utils.datesAreValid(req.body.params.startDate, req.body.params.endDate)) { // Validate object so one cannot post malicious data
                res.sendStatus(400)
                return
            }
        }
        const result = await db.getDataForRandomChart(req.body.params.startDate, req.body.params.endDate)
        res.status(200).send(result)
    }
    else {
        res.sendStatus(400)
    }
})

app.use(indexController);

// start the app
Loadable.preloadAll().then(() => {
    app.listen(PORT, (error) => {
        if (error) {
            return console.log('something bad happened', error);
        }

        console.log("listening on " + PORT + "...");
    });
});


export default PORT