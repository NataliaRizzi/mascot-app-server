const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet"
    }
  ],
  web: {
    type: String,
    required: false
  },
  logo: {
    data: Buffer,
    contentType: String,
    required: false
  },
  queries: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
      accepted: { type: Boolean, default: false }
    }
  ]
});

const Organization = mongoose.model("Organization", OrganizationSchema);

Organization.appendQuery = async (userId, petId, org) => {
  const myOrg = await Organization.findById(org);
  // for testing I don't have access to the toJSON method
  const isExisting = myOrg.toObject().queries.some(element => {
    return (
      JSON.parse(JSON.stringify(element.user)) === userId &&
      JSON.parse(JSON.stringify(element.pet)) === petId
    );
  });
  return isExisting;
};

module.exports = Organization;
