const orgController = require("./org.controller");
const mockData = require(".,/testing/mock.utils");
const OrgModel = require("../models/org");
const UserMOdel = require("../models/user")
const mongoose = require("mongoose");

let ctx;
describe("org controller", () => {
  beforeAll(async () => {
    // await mongoose.connect(global.__MONGO_URI__);
    orgMock = {
      name: "Help WOW",
      location: "Barcelona",
      email: "helpwow@gmail.com",
      web: "www.helpwow.com",
      queries: [],
      pets: []
    };

    addMockOrg = {
      name: "Help dos",
      location: "Barcelona",
      email: "helpdogs@gmail.com",
      web: "www.helpdogs.com",
      queries: [],
      pets: []
    };

    orgWIthQueryMock = {
      name: "Help dos tra la",
      location: "Barcelona",
      email: "helpdogs@gmail.com",
      web: "www.helpdogs.com",
      queries: [
        {
          pet: "5c82915a13ce954a0c309569",
          user: "5c82915a13ce954a0c309569",
          accepted: false
        }
      ],
      pets: [{ _id: "5c82915a13ce954a0c309569" }]
    };
  });

  // afterAll(() => {
  //   await mongoose.disconnect();
  // })

  beforeEach(() => {
    ctx = {};
  });

  test("should return all organizations", async () => {
    const newOrg = new OrgModel(orgMock);
    await newOrg.save();
    await orgController.getOrgs(ctx);
    expect(JSON.parse(JSON.stringify(ctx.body))).toMatchObject([orgMock]);
  });

  // how to test errors in here
  xtest("should return an empty array if there is no org", async () => {
    await orgController.getOrgs(ctx);
    expect(ctx.status).toEqual(200);
    expect(ctx.body).toEqual([]);
  });

  test('should return an organization', async () => {
    const newOrg = new OrgModel(orgMock);
   const newOrgId =  await newOrg.save()
   const org_id = newOrgId._id.toJSON()
    ctx = {
      params: {
        org_id
      }
    };
    await orgController.getOrg(ctx);
    expect(JSON.parse(JSON.stringify(ctx.body))).toMatchObject(orgMock);
  })

  test("should throw an error if there is no id for the organization", async () => {
    const newOrg = new OrgModel(addMockOrg);
    await newOrg.save();
    await orgController.getOrg(ctx);
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toEqual({
      errors: ["Cannot read property 'org_id' of undefined"]
    });
  });

  test("should add a new org", async () => {
    const newOrg = new OrgModel(addMockOrg);
    await newOrg.save();
    ctx = {
      request: {
        body: addMockOrg
      }
    };
    await orgController.addOrg(ctx);
    expect(ctx.status).toEqual(200);
    expect(JSON.parse(JSON.stringify(ctx.response))).toMatchObject(addMockOrg);
  });

  test("should return 400 in case of an error", async () => {
    await orgController.addOrg(ctx);
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toEqual({
      errors: ["Cannot read property 'body' of undefined"]
    });
  });

  test("should send an adoption request if the query doens't exist", async () => {
    const newOrg = new OrgModel(orgWIthQueryMock);
   const newOrgId =  await newOrg.save()
   const org_id = newOrgId._id.toJSON()
   console.log(org_id, ' org with queries')
    ctx = {
      request: {
        body: {user: "3725483455378" , pet: "372548345534", org: org_id}
      }
    };
    await orgController.adoptionRequest(ctx);
    expect(ctx.body).toEqual(orgWIthQueryMock);
  });

  // fix this as it is throwing an error, instea dof catching it
  test("should return an error if the context for adoption is empty", async () => {
    await orgController.adoptionRequest(ctx);
    expect(ctx.status).toEqual(400);
    expect(ctx.body).toEqual({
      errors: ["Cannot read property 'body' of undefined"]
    });
  });
});

//})
