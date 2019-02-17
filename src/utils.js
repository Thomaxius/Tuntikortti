import moment from 'moment'

// Stolen from SO
const deepCopy = (arr) => {
    const out = []
    for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i]
        let obj = {}
        for (let k in item) {
            obj[k] = item[k]
        }
        out.push(obj)
    }
    return out
}

const date1IsAfterDate2 = (date1, date2) => { // This is used to check that users can't submit data where workday ends before it begins.
    if (moment(date1).diff(moment(date2), true) >= 0) {
        return true
    }
    else {
        return false
    }
}

const datesAreValid = (date1, date2) => {
    if (!moment(date1).isValid() || !moment(date2).isValid()) { // Do a moment check that the dates are valid
        console.log('Invalid date(s)', date1, date2)
        return false
    }
     
    date1 = new Date(date1)
    date2 = new Date(date2)
    const isValidDate = (date) => { // Check that date is a valid date 
        return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date)
      }
    if (!isValidDate(date1) || !isValidDate(date2)) {
        console.log('WorkdayValidator: Invalid type of date')
        return false
    }
    else if (date1IsAfterDate2(date1, date2)) { // Check that workday begin date is not after end
        console.log('WorkdayValidator: Invalid date range')
        return false
    }
    else {
        return true
    }
}


const loadsAreInteger = (loadsArray) => { // Check that load amounts (paulig_amount, fazer_amount, etc.) are numeric
    Object.values(loadsArray[0]).forEach((element) => {
        if (isNaN(element) || element == null) {
            console.log('WorkdayValidator: load is not a number: ', element)
            return false
        }
    })
    return true
} 

const workdayOverlaps = (arr, workdayObj) => { // returns an error object with error = true IF workday DOES overlap
    if (arr.length === 0) {
        return {error: false}
      }
      for (let item of arr) {
        const workdayBeginsBeforeComparedBegins = (moment(workdayObj.workday_date_begin).diff(moment(item.workday_date_begin), true) < 0)
        const workdayBeginsBeforeComparedEnds = (moment(workdayObj.workday_date_begin).diff(moment(item.workday_date_end), true) < 0)
        const workdayEndsBeforeComparedBegins = (moment(workdayObj.workday_date_end).diff(moment(item.workday_date_begin), true) < 0)
        const workdayEndsBeforeComparedEnds = (moment(workdayObj.workday_date_end).diff(moment(item.workday_date_end), true) < 0)
  
        // Don't laugh, I was bashing my head in because of these
        const condition1 = (workdayBeginsBeforeComparedBegins && workdayBeginsBeforeComparedEnds && workdayEndsBeforeComparedBegins && workdayEndsBeforeComparedEnds) 
        const condition2 = (!workdayBeginsBeforeComparedBegins && !workdayBeginsBeforeComparedEnds && !workdayEndsBeforeComparedBegins && !workdayEndsBeforeComparedEnds)
        if (!condition1 && !condition2) {
            console.log('error')
          return {error: true, conflictingWorkday: item}
        }
      }
    return {error: false}
}

const isValidRequest = (req, objectName) => {
    if (!req.body.params) {
        console.log('Invalid post request: parameters missing')
        return false
    }
    else if (!req.body.params[objectName]) {
        console.log('Invalid post request parameters: object missing')
        return false
    }
    else {
        return true
    }
}


const isValidWorkdayObj = (workdayObj) => { 
    try {
        if (Object.keys(workdayObj).length !== 8) { // Workday objects have a total of 8 keys
            console.log('WorkdayValidator: invalid object length, object: ', workdayObj)
            return false
        }

        else if (!datesAreValid(workdayObj.workday_date_begin, workdayObj.workday_date_end)) { // 
            return false
        }    

        else if (!loadsAreInteger(workdayObj.loads)) {
            return false
        }
    }
    catch(err) {
        console.log("WorkdayValidator: invalid post request", err)
        return false
    }
            
    return true
}


const getDateDifferenceInHours = (earlierDate, laterDate) => { // Returns difference of two date objects in hours
    let difference = moment(laterDate).diff(moment(earlierDate), 'hours', true).toFixed(2)
    if (difference < 0) { // If workday end date is in the next day
      difference = moment(earlierDate).diff(moment(laterDate), 'hours', true).toFixed(2)
    }
    return difference
  }


const getPaddedHhmmsString = (dateObj) => `${("0" + dateObj.getHours()).slice(-2)}:${("0" + dateObj.getMinutes()).slice(-2)}` // Returns a HH MM string
const getTwoDateStrings = (date1Obj, date2Obj) => (Number(date1Obj.getDate()) !== Number(date2Obj.getDate())) ? `${moment(date1Obj).format("ddd DD-MM-YY")}-${moment(date2Obj).format("ddd DD-MM-YY")}` : `${moment(date1Obj).format("ddd DD-MM-YY")}` //Get a 'ddd DD:MM-ddd DD:MM' -String between two dates

export default {deepCopy, date1IsAfterDate2, isValidWorkdayObj, datesAreValid, workdayOverlaps, isValidRequest, getPaddedHhmmsString, getTwoDateStrings, getDateDifferenceInHours}
