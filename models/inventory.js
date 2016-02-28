'use strict';
module.exports = function() {
  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = data;
    db.inventory.create({
      sku: payload.sku,
      location: payload.location
    })
    .then(success)
    .catch(err);
  }

  function _update(data, err, success) {
    let payload = data;
    db.inventory.find({where: {sku: payload.sku}})
    .then(function(matchedOrder) {
      matchedOrder.updateAttributes(data)
      .then(success)
      .catch(err)
    })
    .catch(err)
  }

  function _find(data, err, success) {
    let payload = data;
    db.inventory.findAll({where: {sku: payload.sku}})
    .then(success)
    .catch(err);
  }

  function _findAll(err, success) {
    db.inventory.findAll()
    .then(success)
    .catch(err);
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.inventory.destroy({where: {sku: payload.sku}})
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
