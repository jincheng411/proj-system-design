const request = require('superTest');
const app = require ('./app.js');

describe('get /products', () => {
  test('should return a 200 status code', async () => {
    const response = await request(app).get('/api/products').send({});
    expect(response.statusCode).toBe(200)
  })
  test('should return an array', async () => {
    const response = await request(app).get('/api/products').send({});
    expect(response.body).toBeInstanceOf(Array)
  })
  test('should return an array of 5 elements if no params passed', async () => {
    const response = await request(app).get('/api/products').send({});
    expect(response.body.length).toEqual(5)
    expect(response.body[0].id).toEqual(1)
  })
  test('should return an array of n elements if params passed', async () => {
    const response = await request(app).get('/api/products?count=8&page=2').send({});
    expect(response.body.length).toEqual(8)
    expect(response.body[0].id).toEqual(9)

  })
})