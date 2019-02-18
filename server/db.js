const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('workdays.db')

const addWorkday = async (workday) => {
    const sql = "INSERT INTO `workdays` (`workday_begin`, `workday_end`,`vehicle`, `akaa_amount`, `fazer_amount`, `kesko_amount`, `merca_amount`, `messi_amount`, `pahvit_amount`, `paulig_amount`, `other_amount`, `other_info`, `urakka`) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?)"
    const params = [workday.workday_date_begin, workday.workday_date_end, workday.vehicle_id, workday.loads[0].akaa_amount, workday.loads[0].fazer_amount, workday.loads[0].kesko_amount, workday.loads[0].fazer_amount, workday.loads[0].merca_amount, workday.loads[0].messi_amount, workday.loads[0].pahvit_amount, workday.loads[0].paulig_amount, workday.loads[0].other_amount, workday.other]
    const result = await query(db, sql, params)
    if (result) {
        console.log('Query ran succesfully', sql, params)
        return true
    }
    else {
        return false
    }
} 


const addTohoily = async (tohoily) => {
    const sql = "insert into `tohoilyt` (`date`, `time`,`severity`, `delay`, `description`) VALUES  (?,?,?,?,?)"
    const params = [tohoily.tohoilyDateString, tohoily.tohoilyTime, tohoily.severity, tohoily.delay, tohoily.description]
    const result = await query(db, sql, params)
    if (result) {
        console.log(`Query ran succesfully: insert into tohoilyt ('date', 'time','severity', 'delay', 'description') VALUES  (${params.join(',')})`)
    }
    return result
}


const getWorkdaysAndTohoilyt = async (startDate, endDate) => {
    const sql = "select *, Cast ((JulianDay(w.workday_end) - JulianDay(w.workday_begin)) * 24 As Decimal) as workday_length, (select  count(*) from tohoilyt t where date(w.workday_begin) = date(t.date)) AS tohoilyt from workdays w WHERE date(w.workday_begin) >  date(?) and  date(w.workday_end) <  date(?) group by date(w.workday_begin) order by w.workday_begin desc"
    const sql1 = "select sum(Cast ((JulianDay(w.workday_end) - JulianDay(w.workday_begin)) * 24 As Decimal)) as total_hours, sum(merca_amount) as total_merca, sum(paulig_amount) as total_paulig, sum(fazer_amount) as total_fazer, sum(kesko_amount) as total_kesko, sum(other_amount) as total_other, sum(pahvit_amount) as total_pahvit, sum(messi_amount) as total_messi from workdays w WHERE date(w.workday_begin) >  date(?) and  date(w.workday_end) <  date(?) order by w.workday_begin desc"
    const workdaysAndTohoilyt = await query(db, sql, [startDate, endDate])
    const totalSumOfTasks = await query(db, sql1, [startDate, endDate])
    return { workdaysAndTohoilyt: workdaysAndTohoilyt, totalSumOfTasks: totalSumOfTasks }
}


// Shout-out to my man rce for teaching this
const query = (db, sql, params) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
        if (err) {
            reject(err)
            console.log(err)
        } else {
            resolve(rows)
        }
    })
}).catch((error) => false)


const getAllWorkdays = async () => {
    const sql = "select workday_begin as workday_date_begin, workday_end as workday_date_end from workdays"
    return await query(db, sql, [])
}


const getDataForWorkdayChart = async (startDate, endDate) => {
    const sql = `SELECT Cast ((JulianDay(w.workday_end) - JulianDay(w.workday_begin)) * 24 As Decimal) as workday_length, date(w.workday_begin) as date, (select  count(*) 
    from tohoilyt t where date(w.workday_begin) = date(t.date)) AS tohoilyt, COALESCE((select Cast ((JulianDay(s.sleep_to_date) - JulianDay(s.sleep_from_date)) * 24 As Decimal) from sleepdata s where date(w.workday_begin) = date(s.sleep_to_date) ),0) as sleep_amount 
    FROM workdays w WHERE date(w.workday_begin) >  date(?) and  date(w.workday_end) <  date(?) order by w.workday_begin desc`
    const result = await query(db, sql, [startDate, endDate])
    return result
}

const getDataForWeekdayAverageChart = async (startDate, endDate) => {
    const sql = `SELECT avg(subquery1.hours) as avg_workhours, subquery1.weekday, avg(subquery1.fazer_amount + subquery1.merca_amount + subquery1.paulig_amount + subquery1.messi_amount + subquery1.akaa_amount + subquery1.kesko_amount + subquery1.other_amount) as avg_tasks, strftime('%w', sleep_to_date) as sleepweekday, AVG(Cast ((JulianDay(sleep_to_date) - JulianDay(sleep_from_date)) * 24 As Decimal)) as avg_sleep
    FROM sleepdata ,
     (SELECT strftime('%w', workday_begin) as weekday, fazer_amount, merca_amount, paulig_amount, messi_amount, akaa_amount, kesko_amount, other_amount, workday_begin, workday_end, Cast ((JulianDay(workday_end) - JulianDay(workday_begin)) * 24 As Decimal) as hours
      FROM workdays ) subquery1
      where subquery1.weekday = sleepweekday and subquery1.workday_begin > date(?) and sleep_to_date > date(?) and subquery1.workday_end < date(?) and sleep_to_date < date(?)
      group by strftime('%w', subquery1.workday_begin) order by workday_begin desc`
    const result = await query(db, sql, [startDate,startDate,endDate, endDate])
    return result
}

const getDataForRandomChart = async (startDate, endDate) => {
    const sql = `SELECT sum(carbohydratesGrams) as carbohydrates, Cast ((JulianDay(w.workday_end) - JulianDay(w.workday_begin)) * 24 As Decimal) as workday_length,
    date(n.date) as date, steps, sum(calories) as calories, sum(sugar) as sugars, 
    sum(proteinGrams) as proteins from nutrition n join steps s on date(n.date) = date(s.date) join workdays w on date(n.date) = date(w.workday_begin) WHERE date(w.workday_begin) >  date(?) and  date(w.workday_end) <  date(?) group by n.date order by n.date desc`
    const result = await query(db, sql, [startDate, endDate])
    return result
}


const addSteps = async (date, steps) => {
    const sql = "INSERT into steps VALUES (?,?)"
    result = await query(db, sql, [date, steps])
    if (result) {
        console.log(`Query ran succesfully: INSERT into steps VALUES (${date} , ${steps})`)
    }
}


const addNutrition = async (arrOfParams) => {
    const sql = "INSERT into nutrition VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    result = await query(db, sql, arrOfParams)
    if (result) {
        console.log(`Query ran succesfully: INSERT into nutrition VALUES (${arrOfParams.join(',')}`)
    }
}


const addSleepData = (arrOfParams) => {
    const sql = `INSERT INTO
                        sleepdata
                 VALUES
                        (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                        `
    db.all(sql,
        [arrOfParams],
        ((error, result) => {
            if (error) {
                throw error
            }
            console.log(`Query ran succesfully: INSERT INTO sleepdata VALUES (${arrOfParams.join(',')}`)
        }))
}


module.exports = {
    addWorkday, addTohoily, getWorkdaysAndTohoilyt, getDataForWorkdayChart, addSleepData, getAllWorkdays, addSteps, addNutrition, getDataForRandomChart, getDataForWeekdayAverageChart
}