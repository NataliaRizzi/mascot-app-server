const mongoose = require('mongoose');
const OrgModel = require('../models/org');
const PetModel = require('../models/pet');

exports.getOrgs = async (ctx, next) => {
  try {
    ctx.body = await OrgModel.find();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

exports.getOrg = async (ctx, next) => {
  try {
    const id = ctx.params.org_id;
    ctx.body = await OrgModel.findById(id).populate(
      'pets queries.user queries.pet',
    );
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

exports.addOrg = async (ctx, next) => {
  try {
    const newOrg = new OrgModel(ctx.request.body);
    newOrg.save();
    ctx.status = 200;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};

exports.adoptionRequest = async (ctx, next) => {
  const { user, pet, org } = ctx.request.body;
  try {
    const adoption = await OrgModel.findByIdAndUpdate(org, {
      $push: {
        queries: {
          user,
          pet,
        },
      },
    },{ new: true });
    ctx.body = adoption;
    ctx.status = 200;
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      errors: [e.message],
    };
  }
};
