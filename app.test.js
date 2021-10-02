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

describe('get /products/:id', () => {
  test('should return a 200 status code', async () => {
    const response = await request(app).get('/api/products/1').send({});
    expect(response.statusCode).toBe(200)
  })
  test('should return an object', async () => {
    const response = await request(app).get('/api/products/1').send({});
    expect(response.body).toBeInstanceOf(Object)
  })
  test('should return proper result when id=1 ', async () => {
    const response = await request(app).get('/api/products/1').send({});
    expect(response.body[0].id).toEqual(1)
  })
  test('should return proper result when id=3 ', async () => {
    const response = await request(app).get('/api/products/3').send({});
    expect(response.body[0].id).toEqual(3)
  })
})

describe('get /products/:id/styles', () => {
  test('should return a 200 status code', async () => {
    const response = await request(app).get('/api/products/1/styles').send({});
    expect(response.statusCode).toBe(200)
  })
  test('should return an Array', async () => {
    const response = await request(app).get('/api/products/1/styles').send({});
    expect(response.body).toBeInstanceOf(Array)
  })
  test('should return proper result when id=1 ', async () => {
    const response = await request(app).get('/api/products/1/styles').send({});
    expect(response.body[0].product_id).toEqual(1)
    expect(response.body[0].results[0].photos.length).toEqual(6)
  })
})