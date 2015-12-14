module.exports = function(){
	var db = require('../db.js')();
  var data = require('../../lib/sanitize.js');
  var Sequelize = require('sequelize');
  var sequelize = db.connection;

  var defaultFail = function(err, doc){ console.log('err' + err + doc); }

  // TODO Write a sanitize function once we see some bad data comeing through
  var defaultSanitize = function(uncleanData){ return uncleanData; }


 // Create worker Table
 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var worker = sequelize.define('workers', {
    name: {
      type: Sequelize.STRING,
    }
  });

    // Add One Worker to db
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {obj} payload Information about the Order to save
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * order.add({name: 'Muffin Man'}, function(data){
  *  console.log('Added Worker');
  * }, function(err){
  *  console.log('Adding Error-' + err);
  * });
  */

  var _addOne = function(payload, success, fail){
    payload = defaultSanitize(payload);
    // Parse payload to be applied to the defined properties
    worker.create({
      name: payload.name,
    })

    // If Successful Adding run Success callback
    .then(success)

    // If Error on Adding run Fail Callback
    .catch(fail);
  }
  // Find All Workers
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Return all Workers with Success and Failure
  * worker.all(function(data){
  *   res.json(data);
  * }, function(err){
  *   console.log('err' + err);
  * });
  */
  var _findAll = function (success, fail){
    worker.findAll().then(success).catch(fail);
    console.log(success);
  }
  // Find One Worker(s)
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Find One based on supplied obj, in this case just a name with Success and Failure
  * worker.findOne({name:'Muffin Man'}, function(data){
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

    worker.findOne({where:payload}).then(success).catch(fail);
  }



// Remove One Worker
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/**
* @param {obj} payload Requires 'id' attribute
* @param {function} success Callback function for execution on successful adding.
* @param {function} fail Callback function for execution on failed adding.
* @example
* // Remove Order with Success and Fail
* worker.remove({name:'Muffin Man'}, function(){
*   console.log('No more records remain with that name');
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
  if(!cleanData.id) return fail({ code:301 });

  worker.destroy({where: {id: cleanData.id}}).then(success).catch(fail);
}



// Update One Worker
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/**
* @param {obj} payload Requires 'name' attribute
* @param {function} success Callback function for execution on successful adding.
* @param {function} fail Callback function for execution on failed adding.
* @example
* // Update Worker with Success and Fail
* worker.update({name:'Muffin Man'}, function(data){
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
      if(!cleanData.id) return fail({ code:301 });

      worker.find({where:{id:cleanData.id}}).then(function (data) {

        // No data was found
        if (!data) return fail({ code:302 });

        // Update the Atts of the returned row
        data.updateAttributes({
            name: update.name,
        }).then(success).catch(fail)
      }).catch(fail);
}
return {
  create: _addOne,
  all: _findAll,
  findOne: _findOne,
  remove: _remove,
  update: _update
}


}();