'use strict';
module.exports = function() {
  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = data;
    db.orders.create(data)
    .then(success)
    .catch(err);
  }

  function _update(data, err, success) {
    let payload = data;
    db.orders.find({where: payload})
    .then(function(matchedOrder) {
      matchedOrder.updateAttributes(data)
      .then(success)
      .catch(err);
    })
    .catch(err);
  }

  function _find(data, err, success) {
    let payload = data;
    db.orders.find({where: payload})
    .then(success)
    .catch(err);
  }

  function _findAll(err, success) {
    db.orders.findAll()
    .then(success)
    .catch(err);
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.orders.destroy({where: {uuid: payload.uuid}})
    .then(success)
    .catch(err);
  }

  return {
    create: _create,
    update: _update,
    find: _find,
    findAll: _findAll,
    destroy: _destroy
  }

}();
