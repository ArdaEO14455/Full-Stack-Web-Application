import mongoose from 'mongoose'
import moment from 'moment'

// creating a new shift schema 
const shiftsSchema = new mongoose.Schema({ 
  date: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // checking if the date format is valid with "moment" library
        // moment function will parse and validate the incoming value (date)
        // accoring to the format provided as the second parameter
        //  isValid method will return a boolean value indicating whether the date adheres to the format
        return moment(v, 'DD-MM-YYYY').isValid()
      },
      // if it returns false, the message below will be displayed
      message: 'Date must be in the format DD-MM-YYYY',
  }},
  start: { type: String, required: true },
  end: { type: String, required: true },
  pause: { type: Number, required: true }
})

const ShiftModel = mongoose.model('Shift', shiftsSchema)

export { ShiftModel }