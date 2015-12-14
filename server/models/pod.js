module.exports = function() {
  var db = require('../db.js')();
  // FIXME data isnt being used why is it here?
  var data = require('../../lib/sanitize.js');

  // FIXME: variables are same 1 is capital. this can cause issues
  var Sequelize = require('sequelize');
  var sequelize = db.connection;

  // FIXME: This have been moved to lib directory fix accordingly
  var APIFunctions = {
    idGenerator : function(){
      function s4() {
        // handles making unique characters in sets of 4
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }

      // combine and return a string of random characters several.
      // the first character MUST be a letter for id's to work. we've gone with "J"
      return "j" + s4() + s4() +  s4() +  s4() +  s4() + s4() + s4() + s4();
    }
  };

  // FIXME: defaultFail never used
  var defaultFail = function(err, doc){console.log('err', err, doc); };
  var defaultSanitize = function (uncleanData){return uncleanData; };

  // Create Pods Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var pod = sequelize.define('pods', {
    current_weight: {
      type: Sequelize.INTEGER
    },
    max_weight: {
      type: Sequelize.INTEGER
    },
    last_maintained:{
      type: Sequelize.INTEGER,
      createdAt: true
    }
  });


  // Add One Pod to db
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
   * @param {obj} payload Information about the Pod to save
   * @param {function} success Callback function for execution on successful adding.
   * @param {function} fail Callback function for execution on failed adding.
   * @example
   * pod.add({current_weight: 124, max_weight: 900, last_maintain: 1200}, function(data){
   *  console.log('Added Unit Pod');
   * }, function(err){
   *  console.log('Adding Error-' + err);
   * });
   */

  var _addOne = function(payload, success, fail){
    payload = defaultSanitize(payload);
    // Parse payload to be applied to the defined properties
    pod.create({
      current_weight: payload.current_weight,
      max_weight: payload.max_weight,
      last_maintained: payload.last_maintained
    })
      // If Successful Adding run Success callback
      .then(success)

      // If Error on Adding run Fail Callback
      .catch(fail);
  };


  // Find All Pods
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
   * @param {function} success Callback function for execution on successful adding.
   * @param {function} fail Callback function for execution on failed adding.
   * @example
   * // Return all Unit Pods with Success and Failure
   * pod.all(function(data){
   *   res.json(data);
   * }, function(err){
   *   console.log('err' + err);
   * });
   */
  var _findAll = function (success, fail){
    pod.findAll().then(success).catch(fail);
    console.log(success);
  };


  // Find One Pod(s)
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
   * @param {function} success Callback function for execution on successful adding.
   * @param {function} fail Callback function for execution on failed adding.
   * @example
   * // Find One based on supplied obj, in this case just a sku with Success and Failure
   * pod.findOne({pod_id:4}, function(data){
   *   res.json(data);
   * }, function(err, doc){
   *   console.log('err' + err + doc);
   * });
   */

  var _findOne = function (payload, success, fail){

    // Run user data through sanitize.
    var cleanData = defaultSanitize(payload);

    // If sanitize fails prevent payload from touching the db
    if(!cleanData) return fail({ code:301 });

    pod.findOne({where:payload}).then(success).catch(fail);
  };

	// Remove One Pod
	// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	/**
	* @param {obj} payload Requires 'sku' attribute
	* @param {function} success Callback function for execution on successful adding.
	* @param {function} fail Callback function for execution on failed adding.
	* @example
	* // Remove Order with Success and Fail
	* unit_pod.remove({pod_id:4}, function(){
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
	  if(!cleanData.id) return fail({ code:301 });

	  pod.destroy({where: {id: cleanData.id}}).then(success).catch(fail);
	}



// Update One Pod
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/**
* @param {obj} payload Requires 'pod_id' attribute
* @param {function} success Callback function for execution on successful adding.
* @param {function} fail Callback function for execution on failed adding.
* @example
* // Update Unit Pod with Success and Fail
* unit_pod.update({pod_id:'j5061', current_weight: 124, max_weight: 900, last_maintain: 1200
}, function(data){
*     console.log(data);
* }, function(err){
*   console.log('Error Code: ' + err.code);
* });
*/
var _update = function(payload,updateObj,success, fail){

      // Run user data through sanitize.
      cleanData = defaultSanitize(payload);

      // If sanitize fails prevent payload from touching the db
      if(!cleanData) return fail({ code:301 });

      //valudation:
      if(!cleanData.id) return fail({ code:301 });

      pod.find({where:{id:cleanData.id}}).then(function (data) {

        // No data was found
        if (!data) return fail({ code:302 });

        // Update the Atts of the returned row
        data.updateAttributes({
            current_weight: updateObj.current_weight,
            max_weight: updateObj.max_weight,
            last_maintained: updateObj.last_maintained,
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