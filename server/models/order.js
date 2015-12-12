module.exports = function (){
  var db = require('../db.js')();
  var data = require('../../lib/sanitize.js');
  var Sequelize = require('sequelize');
  var sequelize = db.connection;

  // TODO Write a nice system wide defaultFail DB interaction Failure
  var defaultFail = function(err, doc){ console.log('err' + err + doc); }

  // TODO Write a sanitize function once we see some bad data comeing through
  var defaultSanitize = function(uncleanData){ return uncleanData; }

  // Create Orders Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 var order = sequelize.define('orders', {
      time_stamp: {
        type: Sequelize.STRING,
        createdAt: true
      },
      recipient: {
        type: Sequelize.STRING,
      }
    })

  // Add One Order to db
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {obj} payload Information about the Order to save
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * order.add({time_stamp: 1500, recipient:'Muffin Man'}, function(data){
  *  console.log('Added Order');
  * }, function(err){
  *  console.log('Adding Error-' + err);
  * });
  */

  var _addOne = function(payload, success, fail){
    payload = defaultSanitize(payload);
    // Parse payload to be applied to the defined properties
    order.create({
      time_stamp: payload.time_stamp,
      recipient: payload.recipient,
    })
    // If Successful Adding run Success callback
    .then(success)

    // If Error on Adding run Fail Callback
    .catch(fail);
  }

  // Find All Orders
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Return all Orders with Success and Failure
  * order.all(function(data){
  *   res.json(data);
  * }, function(err){
  *   console.log('err' + err);
  * });
  */
  var _findAll = function (success, fail){
    order.findAll().then(success).catch(fail);
    console.log(success);
  }

  // Find Orders
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {obj} What to filter upon
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Return all Orders where it meets a certain requirement with Success and Failure
  * order.find({statusId: status.statusId}, function(data){
  *   res.json(data);
  * }, function(err){
  *   console.log('err' + err);
  * });
  */
  var _find = function (payload, success, fail){
    order.findAll({where:payload}).then(success).catch(fail);
    console.log(success);
  }

  // Find One Order(s)
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Find One based on supplied obj, in this case just a time_stamp or ID with Success and Failure
  * order.findOne({time_stamp:'1600'}, function(data){
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

    order.findOne({where:payload}).then(success).catch(fail);
  }

// Remove One Order
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/**
* @param {obj} payload Requires 'time_stamp' attribute
* @param {function} success Callback function for execution on successful adding.
* @param {function} fail Callback function for execution on failed adding.
* @example
* // Remove Order with Success and Fail
* order.remove({time_stamp:'1500'}, function(){
*   console.log('No more records remain with that time_stamp');
* }, function(err, doc){
*   console.log('err' + err + doc);
* });
*/
var _remove = function (payload, success, fail){

  // Run user data through sanitize.
  cleanData = defaultSanitize(payload);

  // If sanitize fails prevent payload from touching the db
  if(!cleanData) return fail({ code:301 });

  // Valudation:
  if(!cleanData.time_stamp) return fail({ code:301 });

  order.destroy({where: {time_stamp: cleanData.time_stamp}}).then(success).catch(fail);
}

// Update One Order
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/**
* @param {obj} payload Requires 'time_stamp' attribute
* @param {function} success Callback function for execution on successful adding.
* @param {function} fail Callback function for execution on failed adding.
* @example
* // Update Unit with Success and Fail
* order.update({time_stamp:'1600', receiptant: "Brandy Bergh"}, function(data){
*     console.log(data);
* }, function(err){
*   console.log('Error Code: ' + err.code);
* });
*/
var _update = function(payload, update, success, fail){

      // Run user data through sanitize.
      cleanData = defaultSanitize(payload);

      // If sanitize fails prevent payload from touching the db
      if(!cleanData) return fail({ code:301 });


      //valudation:
      if(!cleanData.time_stamp) return fail({ code:301 });

      order.find({where:{time_stamp:cleanData.time_stamp}}).then(function (data) {

        // No data was found
        if (!data) return fail({ code:302 });

        // Update the Atts of the returned row
        data.updateAttributes({
            time_stamp: update.time_stamp,
            recipient: update.recipient,
        }).then(success).catch(fail)
      }).catch(fail);
}

//_addOne({time_stamp:"k76GHY", recipient: "Brandy"});
//_update({time_stamp:"k76GHY"}, {time_stamp:"k76GHY", recipient: "jeff"});
//_remove({time_stamp:"k76GHY"})
return {
  add: _addOne,
  all: _findAll,
  findOne: _findOne,
  remove: _remove,
  update: _update,
  find: _find
}
}();
