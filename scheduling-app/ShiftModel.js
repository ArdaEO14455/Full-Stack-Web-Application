import mongoose from 'mongoose'
import parse from 'date-fns/parse/index.js'
import isValid from 'date-fns/isValid/index.js';

// creating a new shift schema 
const shiftsSchema = new mongoose.Schema({ 
  date: {
    type: String,
    required: true,
    validate: {
        //  isValid method will return a boolean value indicating whether the date adheres to the format
        validator: function(v) {
          // Using fns's parse function 
          const parsedDate = parse(v, 'dd-MM-yyyy', new Date());
          // isValid method will return a boolean value indicating whether the date adheres to the format
          return isValid(parsedDate)
        },
      // if it returns false, the message below will be displayed
      message: 'Date must be in the format DD-MM-YYYY',
  }},
  start: { type: String, required: true },
  end: { type: String, required: true },
  pause: { type: Number, required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
})

const ShiftModel = mongoose.model('Shift', shiftsSchema)

export { ShiftModel }