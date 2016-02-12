"use strict";
const express = require('express');
const body_parser = require('body-parser');
const app = express();

//Config
const port = process.env.PORT || 3000;
const data = {order:{sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',quantity: 1,recipients: {name: 'John Doe',address: {street: '3300 University Blvd',city: 'Winter Park',state: 'FL',zip: '32792'},phone: '555-555-5555',email: 'jdoe@gmail.com'}}};

const uuid_generator = require('./uuid-generator.js');
const timestamp = require('./timestamp.js');

data.order.uuid = uuid_generator.uuid();
data.order.timestamp = timestamp.toTimestamp();


app.get('/', function(req, res) {
  res.json(data);
});

app.get('/order', function(req, res) {
    res.send("Order route");
});

app.listen(port, function() {
    console.log("Listening on "+port+"...");
});
