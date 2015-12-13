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
      primaryKey: true
    },
    availability_qty: {
      type: Sequelize.INTEGER
    },
    trigger_qty: {
      type: Sequelize.INTEGER
    },
    replenish_qty: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    weight_lbs: {
      type: Sequelize.INTEGER
    }
  });


  // Add One Unit to db
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
   * @param {obj} payload Information about the Unit to save
   * @param {function} success Callback function for execution on successful adding.
   * @param {function} fail Callback function for execution on failed adding.
   * @example
   * // Add One Unit with Success and Failure. Note if a sku is not supplied, one is generated.
   * unit.add({availability_qty: 3, trigger_qty:4, replenish_qty:5, description: "pink", weight_lbs: 4}, function(data){
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
      availability_qty: payload.availability_qty,
      trigger_qty: payload.trigger_qty,
      replenish_qty: payload.replenish_qty,
      description: payload.description,
      weight_lbs: payload.weight_lbs
    })

      // If Successful Adding run Success callback
      .then(success)

      // If Error on Adding run Fail Callback
      .catch(fail);
  };


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
  };

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
    if(!cleanData) return fail({ code:301 });

    unit.findOne({where:payload}).then(success).catch(fail);
  };


  // Find Units
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {obj} What to filter upon
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Return all units where it meets a certain requirement with Success and Failure
  * unit.find({statusId: status.statusId}, function(data){
  *   res.json(data);
  * }, function(err){
  *   console.log('err' + err);
  * });
  */
  var _find = function (payload, success, fail){
    unit.findAll({where:payload}).then(success).catch(fail);
    console.log(success);
  }


  // Remove One units
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
   * @param {obj} payload Requires 'sku' attribute
   * @param {function} success Callback function for execution on successful adding.
   * @param {function} fail Callback function for execution on failed adding.
   * @example
   * // Remove Unit with Success and Fail
   * unit.remove({sku:'j50611e7d5dd30b0d676654de47d6794d'}, function(){
    *   console.log('No more records remain with that sku');
    * }, function(err, doc){
    *   console.log('err' + err + doc);
    * });
   */
  var _remove = function (payload, success, fail){

    // Run user data through sanitize.
    cleanData = defaultSanitize(payload);

    // If sanitize fails prevent payload from touching the db
    if(!cleanData) return fail({ code:301 });

    //valudation:
    if(!cleanData.sku) return fail({ code:301 });

    unit.destroy({where: {sku: cleanData.sku}}).then(success).catch(fail);
  };


  // Update One units
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
   * @param {obj} payload Requires 'sku' attribute
   * @param {function} success Callback function for execution on successful adding.
   * @param {function} fail Callback function for execution on failed adding.
   * @example
   * // Update Unit with Success and Fail
   * unit.update({sku:'j14d158c64ece48fasd00ccee895b18b8bb6', availability_qty: 9}, function(data){
    *     console.log(data);
    * }, function(err){
    *   console.log('Error Code: ' + err.code);
    * });
   */
  var _update = function(payload, success, fail){

    // Run user data through sanitize.
    cleanData = defaultSanitize(payload);

    // If sanitize fails prevent payload from touching the db
    if(!cleanData) return fail({ code:301 });


    //valudation:
    if(!cleanData.sku) return fail({ code:301 });

    unit.find({where:{sku:cleanData.sku}}).then(function (data) {

      // No data was found
      if (!data) return fail({ code:302 });

      // Update the Atts of the returned row
      data.updateAttributes({
        // Unit's SKU should not change.
        availability_qty: cleanData.qty_on_hand,
        trigger_qty: cleanData.trigger_qty,
        replenish_qty: cleanData.replenish_qty,
        description: cleanData.description,
        weight_lbs: cleanData.weight_lbs
      }).then(success).catch(fail)
    }).catch(fail);
  };

  return {
    create: _addOne,
    findAll: _findAll,
    findOne: _findOne,
    find: _find,
    remove: _remove,
    update: _update
  }
}();
