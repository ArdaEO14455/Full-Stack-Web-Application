import { ShiftModel } from './ShiftModel.js'
import { EmployeeModel } from './EmployeeModel.js'
import { dbClose } from './db.js'


await ShiftModel.deleteMany()
// declaring a variable "shifts" that will store objects containing date, start, end and pause properties in each
const shiftsarra = [
// { date: '21-08-2023', start: '09:00', end: '17:00', pause: 30 },
// { date: '22-08-2023', start: '10:00', end: '18:00', pause: 60 },
// { date: '21-08-2023', start: '11:00', end: '19:00', pause: 30 },
// { date: '23-08-2023', start: '15:00', end: '23:00', pause: 60 },
// { date: '23-08-2023', start: '09:00', end: '17:00', pause: 30 },
// { date: '24-08-2023', start: '10:00', end: '18:00', pause: 60 }

]
//  deleting the documents from the Shift collection
console.log('Deleted shifts')
// inserting the array of objects (shifts) into the Shift collection
// and storing the array of inserted documents in shiftsArray variable
const shiftsArray = await ShiftModel.insertMany(shifts)
console.log('Inserted shifts')

const employees = [
  // {name: "John", email:"john@gmail.com", phone: "2113143234", dob: "13-10-1980", wage: 2000.0, contract: "Part-time", shifts: [shiftsArray[0], shiftsArray[1]]},
  // {name: "Michael", email:"michael@gmail.com", phone: "85469304", dob: "23-08-1995", wage: 1500.0,contract: "Casual", shifts: [shiftsArray[2], shiftsArray[3]]},
  // {name: "Carlie", email:"carlie@gmail.com", phone: "7569315", dob: "01-05-1975", wage: 4000.0, contract: "Full-time", shifts: [shiftsArray[4], shiftsArray[5]]}
]

//  deleting the documents from the Employee collection 
await EmployeeModel.deleteMany()
console.log('Deleted employees')
// seeding the Employee collection with the objects from the employees array
const employeesArray = await EmployeeModel.insertMany(employees)
console.log('Inserted employees')

for(let i = 0; i < employeesArray.length; i++) {
  const employeeShifts = employeesArray[i].shifts
  for(let shiftId of employeeShifts) {
   let name = await ShiftModel.findByIdAndUpdate(shiftId, { employee: employeesArray[i]._id })
   console.log(name)
  }
}

// closing the database connection
dbClose()
