import mongoose from 'mongoose'
import parse from 'date-fns/parse/index.js'
import isValid from 'date-fns/isValid/index.js'

// creating a new shift schema 
const shiftsSchema = new mongoose.Schema({ 
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  startDate: {
    type: String,
    required: true,
    validate: {
        validator: function(v) {
          // Using fns's parse function to validate and parse the date
          const parsedDate = parse(v, 'yyyy-MM-dd', new Date())
          // isValid method will return a boolean value indicating whether the date adheres to the format
          return isValid(parsedDate)
        },
      // if it returns false, the message below will be displayed
      message: 'Date must be in the format yyyy-MM-dd',
  }},
  startTime: { type: String, required: true },
  start: {type: String, required: true },
  endDate: {
    type: String,
    required: true,
    validate: {
        validator: function(v) {
          const parsedDate = parse(v, 'yyyy-MM-dd', new Date())
          return isValid(parsedDate)
        },
      message: 'Date must be in the format yyyy-MM-dd',
  }},
  endTime: { type: String, required: true },
  end: {type: String, required: true },
  pause: { type: Number, required: true },
})

const ShiftModel = mongoose.model('Shift', shiftsSchema)

export { ShiftModel }