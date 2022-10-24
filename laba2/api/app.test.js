const supertest = require('supertest');
const app = require('./app');
const request = supertest(app);

it('message verification',  done => {
    request.get("/").expect('Hello World!').end(done);
});

it('verification port', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
});