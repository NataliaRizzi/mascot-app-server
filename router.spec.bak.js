const request = require('supertest');
const server = require('./index')
// const req = request(app)

beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
});
afterEach(() => {
    server.close();
  });

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
            const response = await request(server).get("/");
            expect(response.status).toEqual(200);
        })
    });
