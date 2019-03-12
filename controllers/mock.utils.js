exports.createPet = () => {
  return {
    _id: '507f191e810c19729de860ea',
    adopted: false,
    available: true,
    species: 'Kitzi',
    breed: 'Thai',
    name: 'Cappucina',
    age: 1,
    weight: 3.4,
    size: 'Small',
    location: 'Barcelona',
    owner: null,
    image: 'https://images.dog.ceo/breeds/borzoi/n02090622_6131.jpg',
    organization: '507f191e810c19729de860eb'
  };
};

exports.createOrg1 = () => {
  return {
    _id: '507f191e810c19729de860eb',
    name: 'Help WOW',
    location: 'Barcelona',
    email: 'helpwow@gmail.com',
    web: 'www.helpwow.com',
    queries: [],
    pets: []
  };
};

exports.createOrg2 = () => {
  return {
    _id: '507f191e810c19729de860eb',
    name: 'Help WOW',
    location: 'Barcelona',
    email: 'helpwow@gmail.com',
    web: 'www.helpwow.com',
    queries: [],
    pets: [{
      pet_id: '507f191e810c19729de860ea'
    }]
  };
};

exports.getUsers = () => {
  return {
    _id: "507f191e810c19729de860ef",
    name: "Carmelo Carrillo",
    email: "carmelogustavo@gmail.com",
    location: "Barcelona",
    pets: [],
    messages: []
  }
}


exports.getOrg = () => {
  return {
    _id: '5c82915a13ce954a0c309562',
    name: 'Help dos',
    location: 'Barcelona',
    email: 'helpdogs@gmail.com',
    web: 'www.helpdogs.com',
    queries: [],
    pets: [] 
  
  }
}

exports.acceptAdoptionUser = () => {
  return {
    _id: '5c82915a13ce954a0c309564',
    name: "Carmelo Carrillo",
    email: "carmelogustavo@gmail.com",
    location: "Barcelona",
    pets: [{
      pet: '5c82915a13ce954a0c309567',
      org: '5c82915a13ce954a0c309563',
    }],
    messages: [{
      pet: '5c82915a13ce954a0c309567',
      org: '5c82915a13ce954a0c309563',
      message: "Su solicitud ha sido aprobada",
      alert: "success",
      read: false
    }

    ]
  }
}