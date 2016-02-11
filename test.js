// const router = require('express');
//
// const json =  {
//    orders: {
//      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
//      quantity: 1,
//      recipients: {
//        name: 'John Doe',
//        address:{
//          street: '3300 University Blvd',
//          city: 'Winter Park',
//          state: 'FL',
//          zip: '32792'
//        },
//        phone: '555-555-5555',
//        email: 'jdoe@gmail.com'
//      }
//    }
//  };
//
//
// request({
//
// })



const request = require('request')

const postData =  {
   orders: {
     sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
     quantity: 1,
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
 };

var url = 'https://www.example.com'
var options = {
  method: 'PUT',
  body: postData,
  json: true,
  url: url
}
request(options, function (err, res, body) {
  if (err) {
    inspect(err, 'error posting json')
    return
  }
  var headers = res.headers
  var statusCode = res.statusCode
  inspect(headers, 'headers')
  inspect(statusCode, 'statusCode')
  inspect(body, 'body')
})
