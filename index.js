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
            validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
        },
  phone:{ type: Number, required: true },
  dob: { type: String, required: true }, 
  wage: { type: Number, required: true }
})

// creating a model based on the employees schema
const EmployeeModel = mongoose.model('Employee', employeesSchema)

const app = express()
const port = 4001 

app.use(express.json())

app.get('/', (req, res) => res.send({ name: ""}))

app.get('/employees', async (req, res) => res.send(await EmployeeModel.find()))

app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id)
    if (employee) {
      res.send(employee)
    } else {
      res.status(404).send({ error: 'Employee not found' })
    }
  }
  catch(err){
    res.status(500).send({ error: err.message })
  }
})

app.post('/employees', async (req, res) => {
  try {
    const newEmployee = await EmployeeModel.create(req.body)
    res.send(newEmployee)
  }
  catch(err){
    res.status(500).send({ error: err.message })
  }
})


app.listen(port)

