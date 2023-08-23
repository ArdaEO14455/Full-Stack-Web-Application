import express from 'express'
import { ShiftModel } from './ShiftModel.js'
import { EmployeeModel } from './EmployeeModel.js'
import './db.js'

// const employees = [
//   {name: "John", email:"john@gmail.com", phone: "2113143234", dob: "13/10/1980", wage: 2000.0, shifts: []},
//   {name: "Michael", email:"michael@gmail.com", phone: "85469304", dob: "23/08/1995", wage: 1500.0, shifts: []},
//   {name: "Carlie", email:"carlie@gmail.com", phone: "7569315", dob: "1/05/1975", wage: 4000.0, shifts: []}
// ]

const app = express()
const port = 4001 

app.use(express.json())

app.get('/', (req, res) => res.send({ name: ""}))

// get request to the employees page will return the list of employees 
app.get('/employees', async (req, res) => res.send(await EmployeeModel.find().select('-shifts')))

// get request to get an employee by id
app.get('/employees/:id', async (req, res) => {
  try {
    // storing an employee found by id from an employee model in a variable "employee"
    // populating the employee object with the documents from Shift collection
    const employee = await EmployeeModel.findById(req.params.id).populate('shifts')
    // if employee is found
    if (employee) {
      // respond with an employee object
      res.send(employee)
      // if employee is not found, display an error message with a status code 404
    } else {
      res.status(404).send({ error: 'Employee not found' })
    }
  }
  // if the try block fails
  catch(err){
    // respond with a status code 500, displaying an error message
    res.status(500).send({ error: err.message })
  }
})
//  creating a new employee with a post method
app.post('/employees', async (req, res) => {
  try {
    // storing a new employee object in a variable "newEmployee"
    const newEmployee = await EmployeeModel.create(req.body)
    // responding with a new employee object
    res.send(newEmployee)
  }
  catch(err){
    // respond with a status code 500, displaying an error message in case it fails
    res.status(500).send({ error: err.message })
  }
})

app.put('/employees/:id', async (req, res) => {
  try {
    // find an employee by id (without the shift details) and update it
    // validating the incoming data with the runValidators property 
    const employee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-shifts')
    // if employee is found
    if (employee) {
      // respond with an employee object
      res.send(employee)
      // if employee is not found, display an error message with a status code 404
    } else {
      res.status(404).send({ error: 'Employee not found' })
    }
  }
  catch(err){
    // respond with a status code 500, displaying an error message in case it fails
    res.status(500).send({ error: err.message })
  }
})

app.delete('/employees/:id', async (req, res) => {
  try {
    // find an employee by their id and delete it
    const employee = await EmployeeModel.findByIdAndDelete(req.params.id)
    // if employee is found
    if (employee) {
      // respond with a status code 200
      res.sendStatus(200)
      // if employee is not found, display an error message with a status code 404
    } else {
      res.status(404).send({ error: 'Employee not found' })
    }
  }
  catch(err){
    // respond with a status code 500, displaying an error message in case it fails
    res.status(500).send({ error: err.message })
  }
})


app.listen(port)

