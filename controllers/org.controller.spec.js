const orgController = require('./org.controller');
const mockingoose = require('mockingoose').default;

//beforeAll(): connect to database and prepare data
// afterAll(): database disconnect and remove them
let addMockOrg;
let orgMock;
let ctx;
describe('org controller', () => {
  beforeAll(() => {
    orgMock = {
      _id: '507f191e810c19729de860ea',
      name: 'Help WOW',
      location: 'Barcelona',
      email: 'helpwow@gmail.com',
      web: 'www.helpwow.com',
      queries: [],
      pets: []
    };

    addMockOrg = {
      _id: '5c82915a13ce954a0c309562',
      name: 'Help dos',
      location: 'Barcelona',
      email: 'helpdogs@gmail.com',
      web: 'www.helpdogs.com',
      queries: [],
      pets: []
    }
  })

  beforeEach(() => {
    mockingoose.resetAll();
    ctx = {};
  });

  test('should return all organizations', async () => {
    mockingoose.Organization.toReturn(
      [{
        _id: '507f191e810c19729de860ea',
        name: 'Help WOW',
        location: 'Barcelona',
        email: 'helpwow@gmail.com',
        web: 'www.helpwow.com',
        queries: [],
        pets: []
      }],
      'find'
    );

    await orgController.getOrgs(ctx);
    expect(JSON.parse(JSON.stringify(ctx.body))).toEqual([{
      _id: '507f191e810c19729de860ea',
      name: 'Help WOW',
      location: 'Barcelona',
      email: 'helpwow@gmail.com',
      web: 'www.helpwow.com',
      queries: [],
      pets: []
    }]);
  });

  test('should return 400 in case of an error', async () => {
    mockingoose.Organization.toReturn(new Error('My Error'), 'find');

    await orgController.getOrgs(ctx);
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toEqual({
      errors: ['My Error']
    });
  });

  test('should return an organization', async () => {
    mockingoose.Organization.toReturn(
      orgMock,
      'findOne'
    );
    ctx = {
      params: {
        org_id: '507f191e810c19729de860ea'
      }
    };
    await orgController.getOrg(ctx);
    expect(JSON.parse(JSON.stringify(ctx.body))).toEqual(orgMock);
  })

  test('should throw an error if there is no id ', async () => {
    mockingoose.Organization.toReturn(
      orgMock,
      'findOne'
    );
    await orgController.getOrg(ctx);
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toEqual({
      errors: ["Cannot read property 'org_id' of undefined"]
    });
  })

  test('should catch an error from the db', async () => {
    mockingoose.Organization.toReturn(
      new Error('My Error'), 'findOne');
  })

  test('should add a new org', async () => {
    mockingoose.Organization.toReturn(
      addMockOrg,
      'save'
    );

    ctx = {
      request: {
        body: addMockOrg
      }
    }
    await orgController.addOrg(ctx);
    expect(ctx.status).toEqual(200);
    expect(JSON.parse(JSON.stringify(ctx.response))).toEqual(addMockOrg);

  })

  test('should return 400 in case of an error', async () => {
    mockingoose.Organization.toReturn(new Error('My Error'), 'find');
    await orgController.getOrgs(ctx);
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toEqual({
      errors: ['My Error']
    });
  });


  test("Cannot read property 'body' of undefined", async () => {
      await orgController.adoptionRequest(ctx);
      expect(ctx.status).toEqual(400);
      expect(ctx.body).toEqual({errors : ["Cannot read property 'body' of undefined"]})
  })
  })


  test('should return 400 in case of an error', async () => {
    mockingoose.Organization.toReturn(new Error('My Error'), 'find');
    await orgController.getOrgs(ctx);
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toEqual({
      errors: ['My Error']
    });
  });

//})