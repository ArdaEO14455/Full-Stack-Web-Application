import mongoose from 'mongoose'
import moment from 'moment'
import { ShiftModel } from './ShiftModel.js'

//  employees schema with the validation rules for the fields
// defining the structure of the model Employee
const employeesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    // email with no whitespaces, lowercase and unique
    type: String, trim: true, lowercase: true, unique: true,
    validate: {
      // validator function tests the email for the correct formatting  
        validator: function(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        // if it returns false, this message will be displayed
        message: "Please enter a valid email"
    },
    // if email isnt provided, the error message will be displayed
    required: [true, "Email required"]
    },
  phone:{ type: Number, required: true },
  dob: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // checking if the date format is valid with moment library
        return moment(v, 'DD-MM-YYYY').isValid()
      },
      // if it returns false, the message below will be displayed
      message: 'DOB must be in the format DD-MM-YYYY',
    },
  },
  wage: { type: Number, required: true },
  // accesssing the object id directly from mongodb
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }]
})

// creating a model based on the employees schema
const EmployeeModel = mongoose.model('Employee', employeesSchema)

export { EmployeeModel } 