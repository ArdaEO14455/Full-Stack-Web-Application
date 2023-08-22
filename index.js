import express from 'express'

const employees = [{name: "John", email:"john@gmail.com", phone: "2113143234", dob: "13/10/1980", wage: 2000.0},
                   {name: "Michael", email:"michael@gmail.com", phone: "85469304", dob: "23/08/1995", wage: 1500.0},
                   {name: "Carlie", email:"carlie@gmail.com", phone: "7569315", dob: "1/05/1975", wage: 4000.0}]


const app = express()
const port = 4001 

app.use(express.json())

app.get('/', (req, res) => res.send({ name: "Damira"}))

app.get('/employees', (req, res) => res.send(employees))

app.post('/employees', (req, res) => {
  // 1. retrieve the data from the request 
  console.log(req.body)
  // 2. TODO: parse/validate it 
  // 3. Push the new entry to the entries array 
  employees.push(req.body)
  // 4. send the new entry with 201 status
  res.send('Post to /employees')
})


app.get('/rosters', (req, res) => res.send(employees))


app.listen(port)

