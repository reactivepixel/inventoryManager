'use strict';
module.exports = function() {
  const db = require('../server/db.js');
  // const Sequelize = require('sequelize');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = data;
    console.log(payload);

    db.orders.create({
      orderId: payload.uuid,
      fullName: payload.recipient.name,
      streetAddress: payload.recipient.address.street,
      city: payload.recipient.address.city,
      state: payload.recipient.address.state,
      zip: payload.recipient.address.zip,
      phone: payload.recipient.phone,
      email: payload.recipient.email,
      timeStamp: payload.timestamp
    })
    .then(success)
    .catch(err);
  }

  function _update(data, err, success) {
    let payload = data;
    db.orders.find({where: {orderId: payload.uuid}})
    .then(function(matchedOrder) {
      matchedOrder.updateAttributes(data)
      .then(success)
      .catch(err);
    })
    .catch(err);
  }

  function _find(data, err, success) {
    let payload = data;
    db.orders.find({where: {orderId: payload.uuid}})
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
    db.order.destroy({where: {orderId: payload.uuid}})
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
