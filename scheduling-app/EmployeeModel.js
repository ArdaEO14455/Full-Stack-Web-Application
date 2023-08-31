import mongoose from 'mongoose'
import parse from 'date-fns/parse/index.js';
import isValid from 'date-fns/isValid/index.js';
import { ShiftModel } from './ShiftModel.js';

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
    },
  phone: { type: Number },
  dob: {
    type: String,
    required: false,
    validate: {
        validator: function(v){
          if (!v) return true
          return /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(v)
        },    
        // function(v) {
        //     if (!v || v === "dd/mm/yyyy") return false
        //     const parsedDate = parse(v, 'dd-MM-yyyy', new Date())
        //     return isValid(parsedDate)
        // },
        message: 'DOB must be in the format DD-MM-YYYY',
    },
  },
  wage: { type: Number, required: true },
  // accesssing the object id directly from mongodb, from the Shift collection
  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' }], 
  contract: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Convert the incoming value to lowercase and compare
        return ['full-time', 'part-time', 'casual'].includes(v.toLowerCase());
      },
      message: 'Contract type must be Full-time, Part-time  or Casual'
    }
    
  }
})

// schema "pre" method to indicate that middleware will execute before the deleteOne method
employeesSchema.pre("deleteOne", { document: false, query: true }, async function(next) {
  // fetching the documents matching the criteria
  const docs = await this.model.find(this.getFilter())
  // mapping through employees 
  const employeesArray = docs.map((employee) => employee._id)
  await ShiftModel.deleteMany({ employee: { $in: employeesArray } })
  next()
})

// creating a model based on the employees schema
const EmployeeModel = mongoose.model('Employee', employeesSchema)

export { EmployeeModel } 