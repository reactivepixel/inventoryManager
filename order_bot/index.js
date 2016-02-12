'use strict';
const request = require('request');
const faker = require('faker');

let i;
for(i = 0; i < 10; i++) {
  let payload = {
    order: {
      items: [
        {
        sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
        quantity: faker.random.number()},
        {
        sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c92',
        quantity: faker.random.number()}
      ],
      recipients: {
        name: faker.name.findName(),
        address:{
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          zip: faker.address.zipCode()
        },
        phone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email()
      }
    }
  }

  request({
    uri: 'http://localhost:3000/order',
    method: 'PUT',
    json: payload,
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(payload)
  }, function(error, response, body) {
    if(error) {
      console.log(error);
    } else {
      console.log(response.statusCode, body);
    }
  });
}
