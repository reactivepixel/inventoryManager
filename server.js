/*
 * server.js
 * Copyright (C) 2016 jamesalexanderdickerson <jamesalexanderdickerson@Jamess-MacBook-Pro-3.local>
 *
 * Distributed under terms of the MIT license.
 */
//"use strict";
const express = require('express');
const body_parser = require('body-parser');
const app = express();
const data =  { orders: { sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91', quantity: 1, recipients: { name: 'John Doe', address:{ street: '3300 University Blvd', city: 'Winter Park', state: 'FL', zip: '32792'}, phone: '555-555-5555', email: 'jdoe@gmail.com' } } };

/*
let idGenerator = function() {
  generateNew: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return  "j" + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
  }
}
*/

app.get('/', function(req, res) {
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on "+port+" ");
    return idGenerator;
});
