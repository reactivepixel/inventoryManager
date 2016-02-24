'use strict';
module.exports = function() {
  const db = require('../server/db.js');
  const Sequelize = require('sequelize');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = data;

    db.orderedItems.create({
      for(let i = 1; i <= payload.units.length; i++) {
        sku: payload.units[i].sku,
        orderId: payload.uuid,
        quantity: payload.units[i].quantity
      }
    })
    .then(success)
    .catch(err);
  }

  function _update(data, err, success) {
    let payload = data;
    db.orderedItems.find({where: {orderId: payload.uuid}})
    .then(function(matchedOrder) {
      matchedOrder.updateAttributes(data)
      .then(success)
      .catch(err);
    })
    .catch(err);
  }

  function _find(data, err, success) {
    let payload = data;
    db.orderedItems.find({where: {orderId: payload.uuid}})
    .then(success)
    .catch(err);
  }

  function _findAll(err, success) {
    db.orderedItems.findAll()
    .then(success)
    .catch(err);
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.orderedItems.destroy({where: {orderId: payload.uuid}, force: {data.force}})
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
