const petController = require('./pet.controller');
const mockingoose = require('mockingoose').default;
const mockUtils = require('./mock.utils');
const PetModel = require('../models/pet');

let petMock;
describe('pet controller', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    ctx = {};
  });

  test('should retrieve all pets', async () => {
    mockingoose.Pet.toReturn([mockUtils.createPet()], 'find');
    await petController.getPets(ctx);
    expect(JSON.parse(JSON.stringify(ctx.body))).toEqual([mockUtils.createPet()]);
  });

  test('should return 400 in case of an error', async () => {
    mockingoose.Pet.toReturn(new Error('My Error'), 'find');

    await petController.getPets(ctx);
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toEqual({ errors: ['My Error'] });
  });

  test('should retrieve 1 pet by id', async () => {
    mockingoose.Pet.toReturn(mockUtils.createPet(), 'findOne');
    ctx = { params: { pet_id: '507f191e810c19729de860ea' } };
    await petController.getPet(ctx);
    expect(JSON.parse(JSON.stringify(ctx.body))).toEqual(mockUtils.createPet());
  });

  test('should throw an error if no id is provided', async () => {
    mockingoose.Pet.toReturn(mockUtils.createPet(), 'findOne');
    await petController.getPet(ctx);
    expect(ctx.body).toEqual({ errors: ["Cannot read property 'pet_id' of undefined"] });
  });


  test('should add a new pet', async () => {
    const newPet = mockUtils.createPet();
    mockingoose.Pet.toReturn(newPet, 'save');
    mockingoose.Organization.toReturn(mockUtils.createOrg1(), 'findOne');
    mockingoose.Organization.toReturn(mockUtils.createOrg2(), 'save');
    ctx = { request: { body: newPet } };
    await petController.addPet(ctx);
    console.log(JSON.parse(JSON.stringify(ctx.response)), 'ctx.response');
    expect(JSON.parse(JSON.stringify(ctx.response))).toEqual(mockUtils.createPet());
  });


  test('should throw an error if the body is empty', async () => {
    mockingoose.Pet.toReturn(mockUtils.createPet(), 'findOne');
    await petController.addPet(ctx);
    expect(ctx.body).toEqual({ errors: ["Cannot read property 'body' of undefined"] });
  });

});
