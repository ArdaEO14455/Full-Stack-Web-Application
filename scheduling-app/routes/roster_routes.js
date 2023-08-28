import { Router } from 'express'
import { EmployeeModel } from '../EmployeeModel.js'
import { ShiftModel } from '../ShiftModel.js'
import parse from 'date-fns';
import isValid from 'date-fns';

// creating a new router object
const router = Router()

// function to validate the incoming date
function validateDate(req, res, next) {
  // extracting start_date and end_date from the parameters
  const { start_date, end_date } = req.params
  
  if (!start_date || !end_date) {
      return res.status(400).send("Start date and end date are required.")
  }
  
  const startDateTime = DateTime.fromFormat(start_date, 'DD/MM/YYYY')
  const endDateTime = DateTime.fromFormat(end_date, 'DD/MM/YYYY')

  if (!startDateTime.isValid || !endDateTime.isValid) {
      return res.status(400).send("Invalid date format. Use DD/MM/YYYY format.")
  }

  req.params.start_date = startDateTime.toFormat('DD/MM/YYYY')
  req.params.end_date = endDateTime.toFormat('DD/MM/YYYY')
  
  next()
}


router.get('/', async (req, res) => {
  try {
    // Since no date range is specified, we simply find all shifts
    const shifts = await ShiftModel.find()
      // Populate the 'employee' field with only 'name' and 'email'
      .populate('employee', 'name email');

    // Send the shift details back to the client
    res.send(shifts);
  } catch (err) {
    // In case of an error, send an error message back
    res.status(500).send({ error: err.message });
  }
});


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