import express from 'express'
import './db.js'
import employeeRoutes from './routes/employee_routes.js'
import rosterRoutes from './routes/roster_routes.js'
import cors from 'cors'

// creating an instance of the express app
const app = express()

// middleware to allow access to the routes
app.use(cors())

// parsing incoming requests with express.json
app.use(express.json())

// attaching all the employees routes to the application
app.use('/employees', employeeRoutes)

app.use('/', rosterRoutes)

export default app