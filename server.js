/*
 * server.js
 * Copyright (C) 2016 jamesalexanderdickerson <jamesalexanderdickerson@Jamess-MacBook-Pro-3.local>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';
const express = require('express');
const body_parser = require('body-parser');
const json_parser = body_parser.json();
const app = express();

//Create a function to generate a new UUID number
function number() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
function uuid() {
  return  'j' + number() + number() + number() + number() + number() + number() + number() + number();
}

//Add the current time to the json data
//created a function to get the date
function toTimestamp(strDate) {
    const now = new Date();
    const date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
    const time = [now.getHours(), now.getMinutes(), now.getSeconds()];
    const suffix = (time[0] < 12) ? 'AM' : 'PM';
    time[0] = (time[0] < 12) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;
    for (let i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = '0' + time[i];
        }
    }
    return date.join('/') + ' ' + time.join(':') + ' ' + suffix;
}


app.get('/', function(req, res) {
  res.send('Homepage');
});

app.route('/order')
  .get(function(req, res) {
    res.send('Making PUT request to /order');
  })
  .put(json_parser, function(req, res, body) {
    const data = req.body;

    data.order.uuid = uuid();
    data.order.timestamp = toTimestamp();

    res.end();
    console.log(data);
  });

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Listening on ' + port + '...');
});
