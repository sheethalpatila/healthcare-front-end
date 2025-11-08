const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Auth routes', () => {
  beforeAll(async () => {
    // connect memory mongo etc
  });

  afterAll(async () => { await mongoose.disconnect() });

  test('signup -> returns token and user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ name: 'Test', email: 't@test.com', password: 'Pass1234' });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBeUndefined(); // we return limited user
  });
});
