import app from './app.js'
import request from 'supertest'

describe('App tests', () => {

  test('Create a new employee', async () =>{
    const res = await request(app).post('/employees').send({
      name: 'Sam',
      wage: 25,
      contract: 'Full-time'
    })
    expect(res.status).toBe(201)
  })
  
  describe('GET /employees', () =>{
    let res

    beforeEach(async () => {
      res = await request(app).get('/employees') 
    })

    test('Returns JSON', () => {
      expect(res.status).toBe(200)
      expect(res.header['content-type']).toMatch('json')
    })

    test('Returns an array of objects', () => {
      expect(res.body).toBeInstanceOf(Array) 
    })

    test('Employee objects have properties "name", "_id" and "contract"', () => {
      res.body.forEach(el =>{
        expect(el._id).toBeDefined()
        expect(el.name).toBeDefined()
        expect(el.contract).toBeDefined()
      })
    })

    test('Employee id is 24 characters long', () => {
      expect(res.body[0]._id).toHaveLength(24)
    })
  })
})
