/* Your Code Here */
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(date) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0],
    })
    return this
}

function createTimeOutEvent(date) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0],
    })
    return this
}

function hoursWorkedOnDate(date) {
    let timeInObject = {}
    this.timeInEvents.forEach(obj => {
        if (obj.date === date) {
            timeInObject = obj
        }
    })
    let timeOutObject = {}
    this.timeOutEvents.forEach(obj => {
        if (obj.date === date) {
            timeOutObject = obj
        }
    })
    return (timeOutObject.hour / 100) - (timeInObject.hour / 100)
}

function wagesEarnedOnDate(date) {
    return (hoursWorkedOnDate.call(this, date)) * this.payPerHour
}

function findEmployeeByFirstName(srcArray, firstName) {
    console.log(srcArray)
    console.log(firstName)
    return srcArray.find(function(records) {
        return records.firstName === firstName
    })
}

function calculatePayroll(array) {
    let totalWagesArray = []
    array.forEach(obj => totalWagesArray.push(allWagesFor.call(obj)))
    let sum = 0
    totalWagesArray.forEach(wage => {
        sum += wage
    })
    return sum
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

