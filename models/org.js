const mongoose = require('mongoose');

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
      ref: 'Pet'
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
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
      accepted: { type: Boolean, default: false }
    }
  ]
});

//why is this function being called when the pet detail route is being visited
OrganizationSchema.pre('findOneAndUpdate', async function(next) {
  const query = this.getUpdate();
  const { user, pet } = query['$push'].queries;
  console.log(this.getQuery()._id, 'this.new VALUE');
  next();
});

module.exports = mongoose.model('Organization', OrganizationSchema);
