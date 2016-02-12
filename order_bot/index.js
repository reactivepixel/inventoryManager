'use strict';
const request = require('request');
const faker = require('faker');

// Hits variable controls how many times the request loop will autoamtically run
let hits = 900;

// Automated request loop
let i;
for(i = 0; i < hits; i++) {
  /**
   * Using Faker to produce fake user information
   * Faker API documentation at https://github.com/marak/faker.js
   */
  const payload = {
    order: {
      units: [
        {
        sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
        quantity: faker.random.number()},
        {
        sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c92',
        quantity: faker.random.number()}
      ],
      recipients: {
        name: faker.name.findName(),
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.stateAbbr(),
          zip: faker.address.zipCode()
        },
        phone: faker.phone.phoneNumberFormat(),
        email: faker.internet.email()
      }
    }
  };

/**
 * HTTP PUT Request hitting endpoint /order
 * Converting payload to string for readibility purposes
 */
  request({
    uri: 'http://localhost:3000/order',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload)
  }, function(error, response, body) {
    if(error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  });
};
