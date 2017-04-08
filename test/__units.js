const request = require('supertest');

describe('Units Route', function() {
  var server;
  var testOrderData = {
    "sku": "a5296ab9-9eee-7ba0-0a79-b801594f2c94",
    "name": "Christopher Fortin",
    "location": "Florida"
  }

  var testUnit;

  beforeEach(function() {
    server = require('../server/server.js');
  });

  afterEach(function() {
    server.close();
  });

  //Testing if the Unit was created.
  it('Unit Create', function(done) {
    request(server)
      .put('/unit')
      .set('Accept', 'application/json')
      .send(testOrderData)
      .expect('Content-Type', /json/)
      .expect(function(res)
        if(res.body.sku !== testOrderData.sku)
        throw new Error('Unit was not properly created.');
        testUnit = res.body;
      })
      .expect(200, done);
  });

  it('Unit Read One', function(done) {
    request(server)
      .get('/unit/' + testUnit.sku.toString())
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        if(testUnit.sku !== res.body.sku) throw new Error('The sku returned does not match.');
      })
      .expect(200, done);
  });

    it('unit Read All', function(done) {
      request(server)
        .get('/unit')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          if(res.body.length < 1) throw new Error('There are no entries in the database.');
        })
        .expect(200, done);
    });

    it('unit Update', function(done) {
      request(server)
        .get('/unit/' + testUnit.sku.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          if(testUnit.sku !== res.body.sku) throw new Error('Did not update record');
        })
        .expect(200, done);
    });

    it('unit Destroy', function(done) {
      request(server)
        .delete('/unit/' + testUnit.sku.toString())
        .set('Accept', 'application/json')
        .send({force: true})
        .expect('Content-Type', /json/)
        .expect(function(res) {
          if(!res.body.success) throw new Error ('Destroy failed.')
        })
        .expect(200, done);
    });


})
