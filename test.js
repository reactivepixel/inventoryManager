'use strict';
const request = require('request');
const json = {
  order: {
    items: [
      {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 1},
      {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 1}
    ],
    recipients: {
      name: 'John Doe',
      address:{
        street: '3300 University Blvd',
        city: 'Winter Park',
        state: 'FL',
        zip: '32792'
      },
      phone: '555-555-5555',
      email: 'jdoe@gmail.com'
    }
  }
}

request({
  uri: 'https://www.reddit.com/order',
  method: 'PUT',
  json: json,
  headers: {
    'Content-Type':'application/json'
  }
}, function(error, response, body) {
  if(error) {
    console.log(error);
  } else {
    console.log(response.statusCode, body);
  }
});
