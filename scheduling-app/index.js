import express from 'express'
import './db.js'
import entryRoutes from './routes/employee_routes.js'


const app = express()
const port = 4001 

app.use(express.json())

app.get('/', (req, res) => res.send({ name: ""}))

// attaching all the employee routes to the application
app.use(entryRoutes)

app.listen(port)

