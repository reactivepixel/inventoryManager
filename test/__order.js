const request = require('supertest');
const dataToInsert = {lala: 'dsgaes42q3',lolo: '2'};
const array1 = [];

//  Manually configure Test Routes, they will be mapped to individual tests
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const uuidTest = [
     {title: 'Order Json Test', route: '/order', status_code: 200, req: dataToInsert}
];

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

  it('/should check to see if an uuid is been added', function testHealth(done){
      request(server)
        .put(uuidTest[0].route, uuidTest[0].req)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function (res) {

            console.log(res.body);

            var matchedKeys = [];
            for(matchKey in uuidTest[0].req){
                matchedKeys.push(matchKey);
            }

            var matchCount = 0;
            for(resKey in res.body){
                if(matchedKeys.indexOf(resKey) < 0) {
                    // Un Matched Key
                } else {
                    // Key is matched
                    matchCount++;
                }
            }

            if(matchCount !== matchedKeys.length){
                throw new Error('Incorrect total of matches made');
            }

            // matchedKeys



        })
        .expect(uuidTest[0].status_code, done)
  });

  //Write a test the check if the json data is been posted
  // it('should send post params', function testHealth(done) {
  //     request(server)
  //     .post(known_routes[route_index].route)
  //     .send(known_routes[route_index].route)
  //     .expect(known_routes[route_index].status_code, known_routes[route_index].res)
  //     .expect('Content-Type', /json/)
  //     .end(function(err,res) {
  //
  //         if (err) done(err);
  //         res.body.should.have.property(known_routes[route_index].route)
  //         done();
  //     })
  //
  // })

  // Force a bad route
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  it('404 everything bad routes', function testHealth(done){
    request(server)
      .get('/not/a/real/route')
      .expect(404, done);
  });
});
