const orgController = require('./org.controller');
const mockingoose = require('mockingoose').default;

// beforeAll(): connect to database and prepare data
// afterAll(): database disconnect and remove them

let ctx;
describe('org controller', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    ctx = {};
  });

  test('should return all organizations', async () => {
    mockingoose.Organization.toReturn(
      [
        {
          _id: '507f191e810c19729de860ea',
          name: 'Help WOW',
          location: 'Barcelona',
          email: 'helpwow@gmail.com',
          web: 'www.helpwow.com',
          queries: [],
          pets: []
        }
      ],
      'find'
    );

    await orgController.getOrgs(ctx);
    expect(JSON.parse(JSON.stringify(ctx.body))).toEqual([
      {
        _id: '507f191e810c19729de860ea',
        name: 'Help WOW',
        location: 'Barcelona',
        email: 'helpwow@gmail.com',
        web: 'www.helpwow.com',
        queries: [],
        pets: []
      }
    ]);
  });

  test('should return 400 in case of an error', async () => {
    mockingoose.Organization.toReturn(new Error('My Error'), 'find');

    await orgController.getOrgs(ctx);
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toEqual({ errors: ['My Error'] });
  });
});
