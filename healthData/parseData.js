
const fs = require('fs');
const db = require('../server/db')

const parseSleep = () => {
    fs.readFile('./withingsData/sleep1.csv', 'utf8', ((err, contents) => {
        if (err) {
            console.log('error ', err)
            return
        }
        try {
            const rows = contents.split('\n').slice(1)
            rows.forEach((row) => {
                row = row.split(',')
                if (row.length === 14) {
                    let fromDate = row[0]
                    let toDate = row[1]
                    let lightSleepAmount = row[2]
                    let deepSleepAmount = row[3]
                    let rem = row[4]
                    let awake = row[5]
                    let wakeUp = row[6]
                    let DurationToSleep = row[7]
                    let DurationToWakeUp = row[8]
                    let snoring = row[9]
                    let snoringEpisodes = row[10]
                    let averageHeartRate = row[11]
                    let heartRateMin = row[12]
                    let heartRateMax = row[13]
                    db.addSleepData([fromDate, toDate, lightSleepAmount, deepSleepAmount, rem, awake, wakeUp, DurationToSleep, DurationToWakeUp, snoring, snoringEpisodes, averageHeartRate, heartRateMin, heartRateMax])
                }
                else {
                    console.log('Invalid row')
                }
                return
            })
        }
        catch (error) {
            console.log('Error ', error)
        }
    }))
}

const parseActivities = () => {
    fs.readFile('./withingsData/activities.csv', 'utf8', ((err, contents) => {
        if (err) {
            console.log('error ', err)
            return
        }
        try {
            const rows = contents.split('\n').slice(1)
            rows.forEach((row) => {
                
                let row_split = row.split(',', 6)
                let leftover = row.replace(row_split.join(),'').split(',,')[0] 
                leftover = leftover.substring(2).replace('}"', '}') //,"{""calories"":36,""steps"":1349,""distance"":1040,""elevation"":0,""metcumul"":55,""effduration"":780,""intensity"":50,""hr_average"":0,""hr_min"":0,""hr_max"":0,""hr_zone_0"":0,""hr_zone_1"":0,""hr_zone_2"":0,""hr_zone_3"":0}"
                let activity_properties = leftover.replace(/""/g,'') // produces: {calories:43,steps:1656,distance:1272,elevation:72,metcumul:72,intensity:50,hr_average:0,hr_min:0,hr_max:0,hr_zone_0:0,hr_zone_1:0,hr_zone_2:0,hr_zone_3:0}
                if (row) {
                    //todo
                }
                else {
                    console.log('Invalid row')
                }
                return
            })
        }
        catch (error) {
            console.log('Error ', error)
        }
    }))
}

const parseSteps = () => {
    fs.readFile('./withingsData/aggregates_steps.csv', 'utf8', ((err, contents) => {
        if (err) {
            console.log('error ', err)
            return
        }
        try {
            const rows = contents.split('\n').slice(1)
            rows.forEach((row) => {
                row = row.split(',')
                if (row.length == 2) {
                    const date = row[0]
                    const steps = row[1]
                    db.addSteps(date, steps)
                }
                else {
                    console.log('Invalid row')
                }
                return
            })
        }
        catch (error) {
            console.log('Error ', error)
        }
    }))
}

const parseNutrition = () => {
    fs.readFile('./withingsData/nutrition.csv', 'utf8', ((err, contents) => {
        if (err) {
            console.log('error ', err)
            return
        }
        try {
            const rows = contents.split('\n').slice(1)
            rows.forEach((row) => {
                row = row.split(',')
                if (row.length == 20) {
                    const date = row[0]
                    const meal = row[1]
                    const calories = row[2]
                    const fatGrams = row[3]
                    const saturatedFat = row[4]
                    const polyunsaturatedFat = row[5]
                    const monounsaturatedFat = row[6]
                    const transFat = row[7]
                    const cholesterol = row[8]
                    const sodiumMilgrams = row[9]
                    const potassium = row[10]
                    const carbohydratesGrams = row[11]
                    const fiber = row[12]
                    const sugar = row[13]
                    const proteinGrams = row[14]
                    const vitaminA = row[15]
                    const vitaminC = row[16]
                    const calcium = row[17]
                    const iron = row[18]
                    const note = row[19]
                    db.addNutrition([date, meal, calories, fatGrams, saturatedFat, polyunsaturatedFat, monounsaturatedFat, transFat, cholesterol, sodiumMilgrams, potassium, carbohydratesGrams, fiber, sugar, proteinGrams, vitaminA, vitaminC, calcium, iron, note])
                }
                else {
                    console.log('Invalid row')
                }
                return
            })
        }
        catch (error) {
            console.log('Error ', error)
        }
    }))
}
parseSteps()