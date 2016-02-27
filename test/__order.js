'use strict';
const request = require('supertest');
const dataToInsert = {uuid: 'j42bc2ed9899a490fa44dbb2f756542e5', timestamp: 'Mon Feb 22 2016 13:14:26 GMT-0500 (EST)'};
let dataInserted = {};
//  Manually configure Test Routes, they will be mapped to individual tests
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


describe('Loading Express', function () {
    var server;

    // Before / After each test create / destroy the express server to fully simulate unique requests.
    // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
    beforeEach(function (){
    server = require('../server/server.js');
    });
    afterEach(function (){
    server.close();
    });


    it('200 /order Basic Order Test', function testHealth(done){
      request(server)
        .put('/order')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){

            var matchedKeys = [];
            for(matchKey in dataInserted){
                matchedKeys.push(matchKey);
            }

            var matchCount = 0;
            var resKey;
            for(resKey in res.body){
                if((matchedKeys.indexOf(resKey) < 0)) {
                    // Un Matched Key
                } else {
                    // Key is matched
                    matchCount++;
                }
            }

            if(matchCount !== matchedKeys.length){
                throw new Error('Incorrect total of matches made');
            }

            if(dataInserted === dataToInsert){
                throw new Error('key is not match');
            }

            if(!res.body.uuid){
                throw new Error('uuid is not been returned/added');
            }

            if(!res.body.timestamp){
                throw new Error('timestamp is not been returned/added');
            }
        })
        .expect(200, done)
    });



  // Force a bad route
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  it('404 everything bad routes', function testHealth(done){
    request(server)
      .get('/not/a/real/route')
      .expect(404, done);
  });
});
