/*
 * server.js
 * Copyright (C) 2016 jamesalexanderdickerson <jamesalexanderdickerson@Jamess-MacBook-Pro-3.local>
 *
 * Distributed under terms of the MIT license.
 */
"use strict";
const express = require('express');
const body_parser = require('body-parser');
const app = express();
const data =  { order: { sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91', quantity: 1, recipients: { name: 'John Doe', address:{ street: '3300 University Blvd', city: 'Winter Park', state: 'FL', zip: '32792'}, phone: '555-555-5555', email: 'jdoe@gmail.com' } } };

//Create a function to generate a new UUID number
function number() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
function uuid() {
  return  "j" + number() + number() + number() + number() + number() + number() + number() + number();
}

//Add the current time to the json data
//created a function to get the date
function toTimestamp(strDate) {
    const now = new Date();
    const date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    const time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    const suffix = ( time[0] < 12 ) ? "AM" : "PM";
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;
    for ( let i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
            time[i] = "0" + time[i];
        }
    }
    return date.join("/")+ " "+time.join(":")+" "+suffix;
}


data.order.uuid = uuid();
data.order.timestamp = toTimestamp();

app.get('/', function(req, res) {
  res.json(data);
});

app.get('/order', function(req, res) {
    res.send("Order route");
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on "+port+"...");
});
