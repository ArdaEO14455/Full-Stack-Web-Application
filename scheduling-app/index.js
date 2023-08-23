import express from 'express'
import './db.js'
import employeeRoutes from './routes/employee_routes.js'
import rosterRoutes from './routes/roster_routes.js'


// creating an instance of the express app
const app = express()
// specifying the port number for the server to listen on for the HTTP requests
const port = 4001 

app.use(express.json())

app.get('/', (req, res) => res.send({ name: ""}))

// attaching all the employees routes to the application
app.use('/employees', employeeRoutes)

app.use('/roster', rosterRoutes)

app.listen(port)

