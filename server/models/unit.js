module.exports = function (){
  var db = require('../db.js')();
  var data = require('../../lib/sanitize.js');
  var Sequelize = require('sequelize');
  var sequelize = db.connection;

  // TODO make a utility for more than just the API out of the ID Generator
  var APIFunctions = {
    idGenerator : function(){
      function s4() {
        // handles making unqiue characters in sets of 4
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      // combine and return a string of random characters several.
      // the first character MUST be a letter for id's to work. we've gone with "J"
      return "j" + s4() + s4() +  s4() +  s4() +  s4() + s4() + s4() + s4();
    }
  };

  // TODO Write a nice system wide defaultFail DB interaction Failure
  var defaultFail = function(err, doc){ console.log('err' + err + doc); }

  // TODO Write a sanitize function once we see some bad data comeing through
  var defaultSanitize = function(uncleanData){ return uncleanData; }

  // Create Units Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var unit = sequelize.define('units', {

    sku: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    qty_on_hand: {
      type: Sequelize.INTEGER,
    },
    trigger_qty: {
      type: Sequelize.INTEGER,
    },
    replenish_qty: {
      type: Sequelize.INTEGER,
    }

  })

  // Add One Unit to db
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {obj} payload Information about the Unit to save
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Add Unit with Success and Failure. Note if a sku is not supplied, one is generated.
  * unit.add({qty_on_hand: 3, trigger_qty:4, replenish_qty:5}, function(data){
  *  console.log('Added Unit');
  * }, function(err){
  *  console.log('Adding Error-' + err);
  * });
  */

  var _addOne = function(payload, success, fail){
    payload = defaultSanitize(payload);
    // Parse payload to be applied to the defined properties
    unit.create({
      sku: payload.sku || APIFunctions.idGenerator(),
      qty_on_hand: payload.qty_on_hand,
      trigger_qty: payload.trigger_qty,
      replenish_qty: payload.replenish_qty
    })

    // If Successful Adding run Success callback
    .then(success)

    // If Error on Adding run Fail Callback
    .catch(fail);
  }


  // Find All units
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Return all Units with Success and Failure
  * unit.all(function(data){
  *   res.json(data);
  * }, function(err){
  *   console.log('err' + err);
  * });
  */
  var _findAll = function (success, fail){
    unit.findAll().then(success).catch(fail);
  }

  // Find One Unit(s)
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Find One based on supplied obj, in this case just a sku with Success and Failure
  * unit.findOne({sku:'j50611e7d5dd30b0d676654de47d6794d'}, function(data){
  *   res.json(data);
  * }, function(err, doc){
  *   console.log('err' + err + doc);
  * });
  */
  var _findOne = function (payload, success, fail){

    // Run user data through sanitize.
    cleanData = defaultSanitize(payload);

    // If sanitize fails prevent payload from touching the db
    if(!cleanData) return false;

    unit.findOne({where:payload}).then(success).catch(fail);
  }

  return {
    all: _findAll,
    findOne: _findOne,
    add: _addOne
  }
}();