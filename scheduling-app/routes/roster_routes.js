import { Router } from 'express'
import { EmployeeModel } from '../EmployeeModel.js'
import { ShiftModel } from '../ShiftModel.js'
import moment from 'moment'

// creating a new router object
const router = Router()

// function to validate the incoming date
function validateDate(req, res, next) {
  // extracting start_date and end_date from the parameters
  const { start_date, end_date } = req.params
  //  if start_date or _end_date are not specified, the error message will be displayed
  if (!start_date || !end_date) {
      return res.status(400).send("Start date and end date are required.")
  }
  // storing a boolean value which returns when validating the date format 
  const isValidStartDate = moment(start_date, 'DD/MM/YYYY').isValid()
  const isValidEndDate = moment(end_date, 'DD/MM/YYYY').isValid()
  // if start or end date are not of a valid format 
  if (!isValidStartDate || !isValidEndDate) {
    // return an error message 
      return res.status(400).send("Invalid date format. Use DD/MM/YYYY format.")
  }

  req.params.start_date = moment(start_date, 'DD/MM/YYYY').format('DD-MM-YYYY')
  req.params.end_date = moment(end_date, 'DD/MM/YYYY').format('DD-MM-YYYY')
  // passing control to the next middleware
  next()
}

// getting shifts from the specified date range
router.get('/:start_date/:end_date', validateDate, async (req, res) => {
  // extracting start and end dates from query parameters
  const { start_date, end_date } = req.params
  try {
    // storing the date objects in the "shifts" variable
      const shifts = await ShiftModel.find({
        // retrieving all the documents that are in the specified range
          date: {
            // greater than or equal to start date
              $gte: start_date,
              // less than or equal to end date
              $lte: end_date
          }
          // populating shift collection with the employee documents(with only name and email data)
       }).populate('employee', 'name email')
      //  send the shift details back to the client
      res.send(shifts)
  } catch (err) {
    // in case of an error, send an error message back
      res.status(500).send({ error: err.message })
  }
})

// creating a new shift 
router.post('/', async (req, res) => {
  try {
    // storing new shift in the variable newShift
    const newShift = await ShiftModel.create(req.body)
    // responding with a new shift object
    res.send(newShift)
  }
  catch(err){
    // respond with a status code 500, displaying an error message in case it fails
    res.status(500).send({ error: err.message })
  }
})

// updating a shift
router.put('/:id', async (req, res) => {
  try {
    // storing the request params (id) in the "shiftId" variable
    const shiftId = req.params.id
    // extracting the date, start, end, pause properties from the body of the request
    const { date, start, end, pause } = req.body
    // finding the shift by the id and updating the values
    // and seeting new to true, so that when server responds, it responds with the updated object
    const updatedShift = await ShiftModel.findByIdAndUpdate(shiftId, { date, start, end, pause}, { new: true })
    // if shift was not found, send the error message
    if (!updatedShift) {
        return res.status(404).send({ error: "Shift not found" })
    }
    // sending response back to the client
    res.send(updatedShift) 
} catch (err) {
    res.status(500).send({ error: err.message })
}
})

router.delete('/:id', async (req, res) => {
  try {
    // finding shift by id and deleting it
    const shift = await ShiftModel.findByIdAndDelete(req.params.id)
    if (shift) {
      // respond with a status code 200
      res.sendStatus(200)
      // if shift is not found, display an error message with a status code 404
    } else {
      res.status(404).send({ error: 'Shift not found' })
    }
  }
  catch(err){
    // respond with a status code 500, displaying an error message in case it fails
    res.status(500).send({ error: err.message })
  }
})


export default router