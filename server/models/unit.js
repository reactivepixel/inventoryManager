module.export = function (){
  var db = require('../db.js')();
  var mysql = require('mysql');
  var env = process.env;
  var data = require('../../lib/sanitize.js');
  var Sequelize = require('sequelize');
  var express = require('express');
  var req = require('body-parser');
  var sequelize = db.connection;

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
_addOne = function(data, success, fail){
  unit.create({
    sku: data.sku,
    qty_on_hand: data.qty_on_hand,
    trigger_qty:data.trigger_qty,
    replenish_qty:data.replenish_qty
  }).then(function (data){
     data.save().then(function(){
      console.log("success")
     });
    console.log("success")
  }).catch(function (err){
    console.log("error", err)
  })
}
  // Find All units
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  _findAll = function (success, fail){
    unit.find({}).catch(function (err, doc){
      if(err){
       console.log("error: ", err);
      }else{
        console.log("Success: ", doc);
      } 
    })
  }

  // Find One units
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  
  //Finding by SKU
  //TODO put in documentation finding by SKU
  _findOne = function (data, success, fail){
    var cleanData = data.sanitize(data);
    if(!cleanData) return false;
    unit.find({where:{sku:unit}}).catch(function (err, doc){
      if(err){
       console.log("error: ", err);
      }else{
        console.log("Success: ", doc);
      }
    });
  }

  // Remove One units
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  
  _remove = function (data, idx, success, fail){
  unit.find({where: {sku: data.sku}}).then(function (err, data) {
    console.log("remove hit", data);
      if (err) {
          console.log("Error: ", err);
      } else {
          data.destroy({sku: data.sku}).success(function (err, data) {
            console.log("Successful removal: ", data);
              if(err){
                  console.log("error 2: ", err);
              }else{
                  console.log('hits', data);
              }
          })
      }
      console.log(data);
  });
}
  // Update One units
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  
  _update = function(data,success,fail){
        // var cleanData = data.sanitize(item);
        // if(!cleanData) return false;
        unit.find({where:{sku:'k76GHY'}}).then(function (err, data) {
            if(err){
                console.log("Error on update: ", err);
            }
            if(data){
                data.updateAttributes({
                    sku:'pumpkin'
                }).success(function (data1) {
                    console.log("Success on update: ", data1);
                })
            }
        });
  }
   _update();
    
//_remove({sku:"676GHY"});
_addOne({sku:"k76GHY", qty_on_hand: 3, trigger_qty:4, replenish_qty:5});
_addOne({sku:"BBB123", qty_on_hand: 3, trigger_qty:4, replenish_qty:5});
    
  return{
    all: _findAll,
    findOne: _findOne,
    remove: _remove
  }
}();