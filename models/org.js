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
  queries:[
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
      accepted: { type: Boolean, default: false }
    }]
  
});




const Organization = mongoose.model('Organization', OrganizationSchema);;

Organization.appendQuery = async(user, pet, org) => {
  const organization = Organization.findOne(org);

    const myOrg = await Organization.findById(org)
  //  console.log('my orgd inside the model', myOrg.toJSON().queries)
    const myNewArray = myOrg.toJSON().queries.some(element => {
    console.log( JSON.parse(JSON.stringify(element.user)), user, 'element.user and user');
  
      return (JSON.parse(JSON.stringify(element.user))=== user && JSON.parse(JSON.stringify(element.pet))===pet)
    })
  console.log(myNewArray, 'value of my new array');
return myNewArray

  // validate organization is valid
  // if not throw
  // save organization
}
  
module.exports = Organization;
