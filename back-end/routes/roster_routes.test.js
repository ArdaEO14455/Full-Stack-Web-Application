import app from '../app.js'
import request from 'supertest'

describe('Roster routes', () => {
  let res
  let shiftId

  beforeAll(async () =>{
    const res = await request(app).post('/new').send({
      employee: '64f19ece22a3d4e1c55ac3fe',
      startDate: '2023-08-29',
      startTime: '17:00',
      start: '2023-08-29T17:00:00.000Z',
      endDate:'2023-08-29',
      endTime: '23:00',
      end: '2023-08-29T23:00:00.000Z',
      pause: 60
    })
    shiftId = res.body._id
  })
  
    beforeEach(async () => {
      res = await request(app).get('/') 
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

    test('Roster objects have properties "startDate", "endDate" and "pause"', () => {
      res.body.forEach(el =>{
        expect(el.startDate).toBeDefined()
        expect(el.endDate).toBeDefined()
        expect(el.pause).toBeDefined()
      })
    })

    test('Shift id is 24 characters long', () => {
      expect(res.body[0]._id).toHaveLength(24)
    })

    it('Shifts can be updated', async () => {
      const res = await request(app)
        .put(`/${shiftId}`)
        .send({
          start:'2023-08-28T17:00:00.000Z',  
          startDate: '2023-08-28', 
          end: '2023-08-28T23:00:00.000Z',
          endDate: '2023-08-28'
        })
      expect(res.statusCode).toBe(200)
      expect(res.body.start).toBe('2023-08-28T17:00:00.000Z')
      expect(res.body.end).toBe('2023-08-28T23:00:00.000Z')
      expect(res.body.startDate).toBe('2023-08-28')
      expect(res.body.endDate).toBe('2023-08-28')
    })

    it('Shift can be deleted', async () => {
      const res = await request(app).delete(
        `/${shiftId}`
      )
      expect(res.statusCode).toBe(200)
    })
  })