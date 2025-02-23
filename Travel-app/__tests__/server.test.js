import request from 'supertest';
import app from '../src/server/server.js';

const port = process.env.PORT || 4007;
let server;

beforeAll(() => {
  server = app.listen(port);  // Start the server before tests
});

afterAll(() => {
  server.close();  // Close the server after tests
});

describe('Basic Express Server Test', () => {
  it('should return a 200 status when the server is up and running', async () => {
    const response = await request(server).get('/'); // Ensure the server is running
    expect(response.status).toBe(200);
  });
});
