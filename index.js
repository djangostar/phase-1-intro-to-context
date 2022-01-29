// Your code here
function createEmployeeRecord(arr) {
    const employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
     }
    return employee
}

function createEmployeeRecords(arr1) {
    return arr1.map(arr2 => createEmployeeRecord(arr2))
}

function createTimeInEvent(employee, dateStamp) {
    let dateSplit = dateStamp.split(' ')

    const newTimeIn = {
        type: 'TimeIn',
        hour: parseInt(dateSplit[1]),
        date: dateSplit[0]
    }
    employee.timeInEvents.push(newTimeIn)
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let dateSplit = dateStamp.split(' ')

    const newTimeOut = {
        type: 'TimeOut',
        hour: parseInt(dateSplit[1]),
        date: dateSplit[0]
    }
    employee.timeOutEvents.push(newTimeOut)
    return employee
}

function hoursWorkedOnDate(employee, endDate) {
    let timeIn = employee.timeInEvents.find(e => e.date === endDate)
    let timeOut = employee.timeOutEvents.find(e => e.date === endDate)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour

}

function allWagesFor(employee) {
    //let arr = []
    // populate with pay for each date in timeInEvents array
   let dates = employee.timeInEvents.map(e =>  e.date)
    //dates is an array to be used
    //we know we have to use reduce()
    //think about what reduce returns
    //return what reduce returns
    let accumulate = dates.reduce((accumulator, currentWage) => {
        return accumulator + wagesEarnedOnDate(employee, currentWage)
    },0)
    return accumulate
}

function calculatePayroll(employeeArr) {
    let payout = employeeArr.map(pay => pay)
    let calculate = payout.reduce((accumulator, currentPay) => {
        return accumulator + allWagesFor(currentPay)
    },0)
    return calculate
}