import { Router } from 'express'
import { EmployeeModel } from '../EmployeeModel.js'
import { ShiftModel } from '../ShiftModel.js'
import { format, parseISO } from 'date-fns'

// creating a new router object
const router = Router()

// get request to the employees page will return the list of employees 
router.get('/', async (req, res) => res.send(await EmployeeModel.find().select('-shifts')))

// get request to get an employee by id
router.get('/:id', async (req, res) => {
  try {
    // storing an employee found by id from an employee model in a variable "employee"
    // populating the employee object with the documents from Shift collection
    const employee = await EmployeeModel.findById(req.params.id).populate({path: 'shifts', select: '-employee -_id'})
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
router.post('/', async (req, res) => {
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

//  a route to edit data of an individual employee
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body
    //parsing the incoming data into the correct format
    if (updatedData.dob) {
      try {
          updatedData.dob = format(parseISO(updatedData.dob), 'dd-MM-yyyy')
      } catch (e) {
          return res.status(400).send({ error: 'Invalid date format for DOB' })
      }
  }
    // find an employee by id and update it
    // validating the incoming data with the runValidators property 
    const employee = await EmployeeModel.findByIdAndUpdate( id, updatedData, { new: true, runValidators: true })
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
    res.status(500).send({ error: err.message })
  }
})

// deleting an employee by id
router.delete('/:id', async (req, res) => {
  try {
    // deleteOne to delete an object with a specified id 
    const deleteResult = await EmployeeModel.deleteOne({ _id: req.params.id })
    // if at least 1 document was deleted
    if (deleteResult.deletedCount > 0) {
      // send a status code 200
      res.sendStatus(200)
    } else {
      res.status(404).send({ error: 'Employee not found' })
    }
  }
  catch(err) {
    res.status(500).send({ error: err.message })
  }
})

export default router