module.exports = function(){
	var db = require('../db.js')();
  var data = require('../../lib/sanitize.js');
  var Sequelize = require('sequelize');
  var sequelize = db.connection;

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

	var defaultFail = function(err, doc){console.log('err', err, doc); }

	var defaultSanitize = function (uncleanData){return uncleanData; }

  // Create unit_pods Table
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  var unit_pod = sequelize.define('unit_pods', {
    sku:{
      type:Sequelize.INTEGER
    },
    qty:{
      type:Sequelize.INTEGER
    }
  })

  // Add One Unit Pod to db
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {obj} payload Information about the Unit Pod to save
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * unit_pod.add({qty: 1500}, function(data){
  *  console.log('Added Unit Pod');
  * }, function(err){
  *  console.log('Adding Error-' + err);
  * });
  */

  var _addOne = function(payload, success, fail){
    payload = defaultSanitize(payload);
    // Parse payload to be applied to the defined properties
    unit_pod.create({
      sku: payload.sku || APIFunctions.idGenerator(),
      qty: payload.qty
    })

    // If Successful Adding run Success callback
    .then(success)

    // If Error on Adding run Fail Callback
    .catch(fail);
  }
  // Find All Unit Pods
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Return all Unit Pods with Success and Failure
  * unit_pod.all(function(data){
  *   res.json(data);
  * }, function(err){
  *   console.log('err' + err);
  * });
  */
  var _findAll = function (success, fail){
    unit_pod.findAll().then(success).catch(fail);
    console.log(success);
  }
  // Find One Unit Pod(s)
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  /**
  * @param {function} success Callback function for execution on successful adding.
  * @param {function} fail Callback function for execution on failed adding.
  * @example
  * // Find One based on supplied obj, in this case just a sku with Success and Failure
  * unit_pod.findOne({sku:'j046a146d960d0d340da09e62dddb61ac'}, function(data){
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

    unit_pod.findOne({where:payload}).then(success).catch(fail);
  }



	// Remove One Unit Pod
	// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
	/**
	* @param {obj} payload Requires 'sku' attribute
	* @param {function} success Callback function for execution on successful adding.
	* @param {function} fail Callback function for execution on failed adding.
	* @example
	* // Remove Order with Success and Fail
	* unit_pod.remove({sku:'j50611e7d5dd30b0d676654de47d6794d'}, function(){
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

	  unit_pod.destroy({where: {sku: cleanData.sku}}).then(success).catch(fail);
	}



// Update One Unit Pod
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/**
* @param {obj} payload Requires 'sku' attribute
* @param {function} success Callback function for execution on successful adding.
* @param {function} fail Callback function for execution on failed adding.
* @example
* // Update Unit Pod with Success and Fail
* unit_pod.update({sku:'j50611e7d5dd30b0d676654de47d6794d', qty: 220}, function(data){
*     console.log(data);
* }, function(err){
*   console.log('Error Code: ' + err.code);
* });
*/
var _update = function(payload,success, fail){

      // Run user data through sanitize.
      cleanData = defaultSanitize(payload);

      // If sanitize fails prevent payload from touching the db
      if(!cleanData) return fail({ code:301 });


      //valudation:
      if(!cleanData.sku) return fail({ code:301 });

      unit_pod.find({where:{sku:cleanData.sku}}).then(function (data) {

        // No data was found
        if (!data) return fail({ code:302 });

        // Update the Atts of the returned row
        // Unit Pod sku will not change
        data.updateAttributes({
            qty: payload.qty
        }).then(success).catch(fail)
      }).catch(fail);
}
//_findAll();
//_addOne({qty:5});
//_update({time_stamp:"k76GHY"}, {time_stamp:"k76GHY", recipient: "jeff"});
//_remove({sku:'j046a146d960d0d340da09e62dddb61ac'})
//_update({sku:'j046a146d960d0d340da09e62dddb61ac', qty: 19220});
return {
  add: _addOne,
  all: _findAll,
  findOne: _findOne,
  remove: _remove,
  update: _update
}


}();