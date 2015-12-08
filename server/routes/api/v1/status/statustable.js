// Code for status codes -- Only a partial, this will have to be integrated into the actual sequelize file
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

var Sequelize = require('sequelize');

var status = sequelize.define('status', {
  status: {
    type: Sequelize.STRING,
  },
  code: {
    type: Sequelize.INTEGER,
  }
});
