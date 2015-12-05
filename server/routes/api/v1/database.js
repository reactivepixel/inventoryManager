// Gravity Application API | Sample Database for API Testing
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Our Sample Database for testing structure
var orderDatabase = {
  "j1f4f2a2aa2a92637a2629c9ff2fe083a" : {
    tracking : { status : 'Packing', timestamp : 'today'},
    recipient : {name : 'Jazy Jasilo', address : '3300 University Blvd, Winter Park, FL 32792',  email : 'jazy@fullsail.edu', phone : "555-555-5555"},
    units : [
      {unitId: 'j6ab59442ddb7776bcef925d88bc1dd57', quantity : 4,
        details : {price : 2.00, name : 'teacup', stock : 100, restock : 70 }, pod : {id : '6830', status : 'charging'}},
      {unitId: 'j4c34059538fdac3f4cbf6375cf6349e6', quantity : 2,
        details : {price : 4.00, name : 'teapot', stock : 100, restock : 50 }, pod : {id : '1047', status : 'inTransit'}},
      {unitId: 'j8740be07b63789e92a3f8703e0e97f42', quantity : 2,
        details : {price : 8.00, name : 'teaset', stock : 100, restock : 30 }, pod : {id : '9702', status : 'inTransit'}}
    ]
  },

  "j2de23770af2b15ba621d1c70f31eb2b6" : {
    tracking : { status : 'Packing', timestamp : 'today'},
    recipient : {name : 'Baltro Osen', address : '3300 University Blvd, Winter Park, FL 32792',  email : 'baltro@fullsail.edu', phone : "555-555-5555"},
    units : [
      {unitId: 'jdb40dc66d425828880cd89ff29010a65', quantity : 2,
        details : {price : 2.00, name : 'usbDrive', stock : 100, restock : 50 }, pod : {id : '1038', status : 'charging'}},
      {unitId: 'jcd64c16fb033dd213aa71a980d7340bb', quantity : 1,
        details : {price : 4.00, name : 'Computer', stock : 100, restock : 40 }, pod : {id : '9472', status : 'inTransit'}},
      {unitId: 'j9c0f2fc6d603d46e962495e9496c3da6', quantity : 1,
        details : {price : 8.00, name : 'Keyboard', stock : 100, restock : 20 }, pod : {id : '1947', status : 'delivered'}}
    ]
  }
};

module.exports = orderDatabase;