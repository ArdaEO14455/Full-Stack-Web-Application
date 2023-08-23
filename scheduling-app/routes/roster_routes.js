import { Router } from 'express'
import { EmployeeModel } from '../EmployeeModel.js'
import { ShiftModel } from '../ShiftModel.js'

// creating a new router object
const router = Router()

router.get('/roster', async (req, res) => res.send(await ShiftModel.find()))

export default router