import mongoose from 'mongoose'

// creating a new shift schema 
const shiftsSchema = new mongoose.Schema({ 
  date: { type: Date, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  pause: { type: Number, required: true }
})

const ShiftModel = mongoose.model('Shift', shiftsSchema)

export { ShiftModel }