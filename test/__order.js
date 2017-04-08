process.env.PORT = 1234;
const request = require('supertest');
const dataToInsert = {uuid: 'j42bc2ed9899a490fa44dbb2f756542e5', timestamp: 'Mon Feb 22 2016 13:14:26 GMT-0500 (EST)'};

//  Manually configure Test Routes, they will be mapped to individual tests
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const known_routes = [
  {title: 'Basic Order Test', route: '/order', status_code: 200, res: {healthy: true }, req: dataToInsert},
  // {title: 'Status Check', route: '/api/v1/status', status_code: 200, res: {healthy: true}}
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

  for(var route_index in known_routes){
    it('[' + known_routes[route_index].status_code + '] ' + known_routes[route_index].route + ' ' +
    known_routes[route_index].title , function testHealth(done){
      request(server)
        .put(known_routes[route_index].route)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res){

            console.log(res.body);

            var matchedKeys = [];
            for(matchKey in known_routes[route_index].req){
                matchedKeys.push(matchKey);
            }

            var matchCount = 0;
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

            if(known_routes[route_index].req === known_routes[route_index].res){
                throw new Error('key is not match');
            }

            if(!res.body.uuid){
                throw new Error('uuid is not been returned/added');
            }

            if(!res.body.timestamp){
                throw new Error('timestamp is not been returned/added');
            }
        })
        .expect(known_routes[route_index].status_code, done)
    });
  }


  // Force a bad route
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  it('404 everything bad routes', function testHealth(done){
    request(server)
      .get('/not/a/real/route')
      .expect(404, done);
  });
});
