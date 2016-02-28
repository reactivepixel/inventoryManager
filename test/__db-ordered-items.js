const request = require('supertest');

describe('OrderItem Route', function() {
  var server;
  var testOrderItems;

  beforeEach(function() {
    server = require('../server/server.js');
  });

  afterEach(function() {
    server.close();
  });

    it('OrderItem Read All', function(done) {
      request(server)
        .get('/orderedItems')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          if(res.body.length < 1) throw new Error('There are no entries in the database.');
          testOrderItems = res.body;
          console.log(testOrderItems);
        })
        .expect(200, done);
    });

  it('OrderItem Read One', function(done) {
    request(server)
      .get('/orderedItems/' + testOrderItems[0].uuid)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(testOrderItems.uuid !== res.body.uuid) throw new Error('The UUID returned does not match.');
      })
      .expect(200, done);
  });

  it('OrderItem Update', function(done) {
    request(server)
      .get('/orderedItems/' + testOrderItems[0].uuid)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(testOrderItems.uuid !== res.body.uuid) throw new Error('Did not update record');
      })
      .expect(200, done);
  });

  it('OrderItem Destroy', function(done) {
    request(server)
      .delete('/orderedItems/' + testOrderItems[0].uuid)
      .set('Accept', 'application/json')
      .send({force: true})
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(!res.body.success) throw new Error ('Destroy failed.')
      })
      .expect(200, done);
  });
})
