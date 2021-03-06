'use strict';
module.exports = function() {
  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    for(let i = 0; i < data.units.length; i++) {
      data.units[i].uuid = data.uuid;
      db.orderedItems.create(data.units[i])
      .then(success)
      .catch(err);
    }
  }

  function _update(data, err, success) {
    let payload = data;
    db.orderedItems.find({where: {uuid: payload.uuid}})
    .then(function(matchedOrder) {
      matchedOrder.updateAttributes(data)
      .then(success)
      .catch(err);
    })
    .catch(err);
  }

  function _find(data, err, success) {
    let payload = data;
    db.orderedItems.findAll({where: {uuid: payload.uuid}})
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
    db.orderedItems.destroy({where: {uuid: payload.uuid}})
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
