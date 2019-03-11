const mongoose = require("mongoose");
const OrgModel = require("../models/org");
const PetModel = require("../models/pet");


exports.getOrgs = async (ctx, next) => {
  try {
    ctx.body = await OrgModel.find();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    };
  }
};

exports.getOrg = async (ctx, next) => {
  try {
    const id = ctx.params.org_id;
    ctx.body = await OrgModel.findById(id).populate(
      "pets queries.user queries.pet"
    );
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    };
  }
};

exports.addOrg = async (ctx, next) => {
  try {
    const newOrg = new OrgModel(ctx.request.body);
    newOrg.save();
    ctx.status = 200;
    ctx.response = newOrg;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    };
  }
};

exports.adoptionRequest = async (ctx, next) => {
  try {
    if (ctx.request.body) {
      const { user, pet, org } = ctx.request.body;
      // if (!(user && pet && org)){
      //   throw new Error('user, pet, org are required')
      // }
      // const queries =  await OrgModel.findOne({});
      // console.log("Here", queries);
      let adoption = "";
      if ((await OrgModel.appendQuery(user, pet, org)) == false) {
        adoption = await OrgModel.findByIdAndUpdate(org, {
          $push: {
            queries: {
              user,
              pet
            }
          }
        });
        ctx.body = adoption;
      }
    } else {
      console.log("query exists");
      ctx.body = "query exists";
    }

    ctx.status = 200;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message]
    };
  }
};
