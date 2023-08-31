import { Router } from 'express'
import { EmployeeModel } from '../EmployeeModel.js'
import { ShiftModel } from '../ShiftModel.js'



// creating a new router object
const router = Router()

router.get('/', async (req, res) => {
  try {
    // Since no date range is specified, we simply find all shifts
    const shifts = await ShiftModel.find()
      // Populate the 'employee' field with only 'name' and 'email'
      .populate('employee', 'name email')
    // Send the shift details back to the client
    res.send(shifts)
  } catch (err) {
    // In case of an error, send an error message back
    res.status(500).send({ error: err.message })
  }
})

//Get specified shift
router.get('/:id', async (req, res) => {
  try {
    const shifts = await ShiftModel.findById(req.params.id)
      // Populate the 'employee' field with only 'name' and 'email'
      .populate('employee', 'name email')
    // Send the shift details back to the client
    res.send(shifts)
  } catch (err) {
    // In case of an error, send an error message back
    res.status(500).send({ error: err.message })
  }
})

// creating a new shift 
router.post('/new', async (req, res) => {
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