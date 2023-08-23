import { ShiftModel } from './ShiftModel.js'
import { EmployeeModel } from './EmployeeModel.js'
import './db.js'


const shifts = [{ 
  date: '2023-08-21', start: '09:00', end: '17:00', pause: 30 },
{ date: '2023-08-22', start: '10:00', end: '18:00', pause: 60 },
{ date: '2023-08-21', start: '11:00', end: '19:00', pause: 30 },
{ date: '2023-08-22', start: '15:00', end: '23:00', pause: 60 },
{ date: '2023-08-23', start: '09:00', end: '17:00', pause: 30 },
{ date: '2023-08-24', start: '10:00', end: '18:00', pause: 60 }
]

await ShiftModel.deleteMany()
console.log('Deleted shifts')
const shiftsArray = await ShiftModel.insertMany(shifts)
console.log('Inserted shifts')

const employees = [
  {name: "John", email:"john@gmail.com", phone: "2113143234", dob: "13/10/1980", wage: 2000.0, shifts: [shiftsArray[0], shiftsArray[1]]},
  {name: "Michael", email:"michael@gmail.com", phone: "85469304", dob: "23/08/1995", wage: 1500.0, shifts: [shiftsArray[2], shiftsArray[3]]},
  {name: "Carlie", email:"carlie@gmail.com", phone: "7569315", dob: "1/05/1975", wage: 4000.0, shifts: [shiftsArray[4], shiftsArray[5]]}
]

await EmployeeModel.deleteMany()
console.log('Deleted employees')
await EmployeeModel.insertMany(employees)
console.log('Inserted employees')


