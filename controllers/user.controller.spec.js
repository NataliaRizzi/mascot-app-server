const userController = require('./user.controller');
const mockingoose = require('mockingoose').default;
const mockData = require('./mock.utils');

describe('user controller', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    ctx = {};
  });

  test('should get all users', async () => {
    mockingoose.User.toReturn(
      [mockData.getUsers()],
      'find'
    )
    await userController.getUsers(ctx)
    expect(JSON.parse(JSON.stringify(ctx.body))).toEqual([
      mockData.getUsers()
    ])
  })

  test('should return 400 in case of an error when I retrieve users', async () => {
    await userController.getUsers(ctx);
    expect(ctx.body.errors).toEqual(
      ["Cannot set property 'errors' of undefined"]
    );
    expect(ctx.status).toEqual(400);
  })

  test('should return an user by id', async () => {
    mockingoose.User.toReturn(
      mockData.getUsers(),
      'findOne'
    )
    ctx = {
      params: {
        usr_id: mockData.getUsers()._id
      }
    }
    await userController.getUser(ctx);
    expect(JSON.parse(JSON.stringify(ctx.body))).toEqual(mockData.getUsers());
  })

  test('should return 400 in case of an error when I retrieve an user', async () => {
    await userController.getUser(ctx);
    expect(ctx.status).toEqual(400);
  })

  test("should update pets and messages when one adoption is accepted", async () => {
    mockingoose.User.toReturn(
      mockData.acceptAdoptionUser(),
      'findOneAndUpdate'
    )

    mockingoose.Organization.toReturn(
      mockData.getOrg(),
      'findOneAndUpdate'
    )

    mockingoose.Pet.toReturn(
      mockData.createPet(),
      'findOneAndUpdate'
    )
    const orgId = mockData.getOrg()._id;
    const petId = mockData.createPet()._id;
    const userId = mockData.getUsers()._id;
    const queryId = '417f191e810c19729de860ea';
    ctx = { request : {
      body : { 
        orgId,
        petId,
        queryId
      }
    },
     params : {
       usr_id : userId
     }
    }

    await userController.acceptAdoption(ctx);
    console.log(ctx, 'our body');
    
    expect(JSON.parse(JSON.stringify(ctx.body))).toEqual(mockData.acceptAdoptionUser())
  })

  // test('should remove the query', async () => {

  // })

  // test("should change the 'adopted' status into true", async () => {


  // })

  // test('should return 400 in case of an error', async () => {
  //   await userController.acceptAdoption(ctx);
  //   expect(ctx.status).toEqual(400);
  // })

  // test('should add a new user', async () => {
  //   const newUser = mockData.getUsers();
  //   mockingoose.User.toReturn(newUser, 'save');
  //   ctx = {request : { body : newUser}};
  //   await userController.addUser(ctx);
  //   expect(mockingoose.User.toJSON().save.users[0].toEqual({user_id : newUser._id}));
  //   expect(JSON.parse(JSON.stringify(ctx.response))).toEqual(mockUtils.addUser());
  // })

  // test('should return 400 in case of an error', async () => {
  //   mockingoose.User.toReturn(new Error('My Error'), 'findOne');

  //   await userController.addUser(ctx);
  //   expect(ctx.status).toEqual(400);
  //   expect(ctx.body).toEqual({
  //     errors: ['My Error']
  //   });
  // });
})