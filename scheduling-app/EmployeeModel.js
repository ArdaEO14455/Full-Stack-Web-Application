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
    // if email isnt provided, the error message will be displayed
    required: [true, "Email required"]
    },
  phone:{ type: Number, required: true },
  dob: {
    type: String,
    required: [true, "DOB required"],
    validate: {
        // checking if the date format is valid with "date-fns" library
        // Datetime function will parse and validate the incoming value (date)
        // accoring to the format provided as the second parameter
        //  isValid method will return a boolean value indicating whether the date adheres to the format
         validator: function(v) {
          // Using fns's parse function 
          const parsedDate = parse(v, 'dd-MM-yyyy', new Date())
          // isValid method will return a boolean value indicating whether the date adheres to the format
          return isValid(parsedDate)
        // isValid method will return a boolean value indicating whether the date adheres to the format
      },
      // if it returns false, the message below will be displayed
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

// Individual deletion
employeesSchema.pre("findOneAndDelete", async function(next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await ShiftModel.deleteMany({ employee: doc._id });
  }
  next();
});

// Bulk deletion
employeesSchema.pre("deleteOne", { document: false, query: true }, async function(next) {
  const docs = await this.model.find(this.getFilter());
  const users = docs.map((item) => item._id);
  await ShiftModel.deleteMany({ employee: { $in: users } });
  next();
});


// creating a model based on the employees schema
const EmployeeModel = mongoose.model('Employee', employeesSchema)

export { EmployeeModel } 