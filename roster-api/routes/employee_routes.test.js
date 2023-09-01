import app from '../app.js'
import request from 'supertest'

describe('Employee routes', () => {
  let res

  beforeAll(async () =>{
    const res = await request(app).post('/employees').send({
      name: 'Sam',
      wage: 25,
      contract: 'Full-time'
    })
  })
  
    beforeEach(async () => {
      res = await request(app).get('/employees') 
    })

    test('Returns JSON with _id', () => {
      expect(res.status).toBe(200)
      expect(res.header['content-type']).toMatch('json')
      expect(res.body).toBeDefined()
        if (res.body.length > 0) {
          expect(res.body[0]._id).toBeDefined()
        }
    })

    test('Returns an array of objects', () => {
      expect(res.body).toBeInstanceOf(Array) 
    })

    test('Employee objects have properties "name", "_id" and "contract"', () => {
      res.body.forEach(el =>{
        expect(el.name).toBeDefined()
        expect(el.wage).toBeDefined()
        expect(el.contract).toBeDefined()
      })
    })

    test('Employee id is 24 characters long', () => {
      expect(res.body[0]._id).toHaveLength(24)
    })

    it('Employee object can be updated', async () => {
      const employeeId = '64f10ef572fb2030642ac31b'
      const res = await request(app)
        .put(`/employees/${employeeId}`)
        .send({
          name: "Test",
          wage: 30,
          contract: "Casual",
        })
      expect(res.statusCode).toBe(200)
      expect(res.body.wage).toBe(30)
    })

    it('Employee can be deleted', async () => {
      const employeeId = '64f10ef572fb2030642ac31b'
      const res = await request(app).delete(
        `/employees/${employeeId}`
      )
      expect(res.statusCode).toBe(200)
    })
  })

