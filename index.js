import express from 'express'
import mongoose from 'mongoose'


const employees = [
  {name: "John", email:"john@gmail.com", phone: "2113143234", dob: "13/10/1980", wage: 2000.0},
  {name: "Michael", email:"michael@gmail.com", phone: "85469304", dob: "23/08/1995", wage: 1500.0},
  {name: "Carlie", email:"carlie@gmail.com", phone: "7569315", dob: "1/05/1975", wage: 4000.0}
]

mongoose.connect('mongodb+srv://developer:codernewapp@cluster0.sguzlt4.mongodb.net/scheduling-app?retryWrites=true&w=majority')
  .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected' : 'Mongoose failed'))
  .catch(err => console.error(err))


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
  dob: { type: String, required: true }, 
  wage: { type: Number, required: true },
  shifts: [{ type: Schema.Types.ObjectId, ref: 'Shift' }]
})

// creating a model based on the employees schema
const EmployeeModel = mongoose.model('Employee', employeesSchema)

// creating a new shift schema 
const shiftSchema = new mongoose.Schema({
  // referencing an employee if from employee model
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true }, 
  date: { type: Date, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  pause: { type: Number, required: true }
})

const Shift = mongoose.model('Shift', shiftSchema)

const app = express()
const port = 4001 

app.use(express.json())

app.get('/', (req, res) => res.send({ name: ""}))

// get request to the employees page will return the list of employees 
app.get('/employees', async (req, res) => res.send(await EmployeeModel.find()))

// get request to get an employee by id
app.get('/employees/:id', async (req, res) => {
  try {
    // storing an employee found by id from an employee model in a variable "employee"
    const employee = await EmployeeModel.findById(req.params.id)
    // if employee is found
    if (employee) {
      // respond with an employee object
      res.send(employee)
      // if employee is not found, display an error message with a status code 404
    } else {
      res.status(404).send({ error: 'Employee not found' })
    }
  }
  // if the try block fails
  catch(err){
    // respond with a status code 500, displaying an error message
    res.status(500).send({ error: err.message })
  }
})
//  creating a new employee with a post method
app.post('/employees', async (req, res) => {
  try {
    // storing a new employee object in a variable "newEmployee"
    const newEmployee = await EmployeeModel.create(req.body)
    // responding with a new employee object
    res.send(newEmployee)
  }
  catch(err){
    // respond with a status code 500, displaying an error message in case it fails
    res.status(500).send({ error: err.message })
  }
})




app.listen(port)

