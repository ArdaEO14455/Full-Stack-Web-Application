import { Router } from 'express'
import { EmployeeModel } from '../EmployeeModel.js'
import { ShiftModel } from '../ShiftModel.js'
import moment from 'moment'

// creating a new router object
const router = Router()

function validateDateRange(req, res, next) {
  const { start_date, end_date } = req.params; // extract params instead of query

  if (!start_date || !end_date) {
      return res.status(400).send("Start date and end date are required.")
  }

  const isValidStartDate = moment(start_date, 'DD/MM/YYYY').isValid()
  const isValidEndDate = moment(end_date, 'DD/MM/YYYY').isValid()

  if (!isValidStartDate || !isValidEndDate) {
      return res.status(400).send("Invalid date format. Use DD/MM/YYYY format.")
  }

  req.params.start_date = moment(start_date, 'DD/MM/YYYY').format('DD-MM-YYYY')
  req.params.end_date = moment(end_date, 'DD/MM/YYYY').format('DD-MM-YYYY')

  next()
}

// Use :start_date and :end_date to denote params
router.get('/:start_date/:end_date', validateDateRange, async (req, res) => {
  const { start_date, end_date } = req.params; // extract params instead of query
  try {
      const shifts = await ShiftModel.find({
          date: {
              $gte: start_date,
              $lte: end_date
          }
       }).populate('employee', 'name email');
      res.send(shifts);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
})

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

router.put('/:id', async (req, res) => {
  try {
    const shiftId = req.params.id;
    const { date, start, end, pause } = req.body; // Extract the new data from the request body
    // Find the shift by ID and update it
    const updatedShift = await ShiftModel.findByIdAndUpdate(shiftId, { date, start, end, pause}, { new: true })
    if (!updatedShift) {
        return res.status(404).send({ error: "Shift not found" })
    }
    res.send(updatedShift)  // Send back the updated shift
} catch (err) {
    res.status(500).send({ error: err.message })
}
})

router.delete('/:id', async (req, res) => {
  try {
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