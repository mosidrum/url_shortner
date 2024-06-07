import request from 'supertest';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to url shorter api');
});

describe('GET /', () => {
  it('should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to url shorter api');
  });
});
