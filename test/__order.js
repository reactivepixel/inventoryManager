const request = require('supertest');

//  Manually configure Test Routes, they will be mapped to individual tests
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const known_routes = [
  {title: 'Basic Order Test', route: '/order', status_code: 200, res: {healthy: true}},
  // {title: 'Status Check', route: '/api/v1/status', status_code: 200, res: {healthy: true}}
];

describe('Loading Express', function () {
  var server;

  // Before / After each test create / destroy the express server to fully simulate unique requests.
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  beforeEach(function (){
    server = require('../src/server.js');
  });
  afterEach(function (){
    server.close();
  });

  for(var route_index in known_routes){
    it('[' + known_routes[route_index].status_code + '] ' + known_routes[route_index].route + ' ' + known_routes[route_index].title , function testHealth(done){
      request(server)
        .put(known_routes[route_index].route)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(known_routes[route_index].status_code, known_routes[route_index].res, done)
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
