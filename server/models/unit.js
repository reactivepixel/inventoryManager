module.export = function (){
  var db = require('../db.js')();
  var mysql = require('mysql');
  var env = process.env;
  var data = require('../../lib/sanitize.js');
  var Sequelize = require('sequelize');
  var express = require('express');
  var req = require('body-parser');
  var sequelize = db.connection;

  var unit = db.unit;

_addOne = function(data, success, fail){
  unit.sync({force:true}).then(function(){
    unit.create({
      sku: data.sku,
      qty_on_hand: data.qty_on_hand,
      trigger_qty: data.trigger_qty,
      replenish_qty: data.replenish_qty
    }).then(function (data){
       data.save();
      console.log("Success: ")
    }).catch(function (err){
      console.log("Error: ", err)
    })
  });
}
  //Find All units
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

  //Find One units
  // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  //Finding by SKU
  //TODO put in documentation finding by SKU
  _findOne = function (data, success, fail){
    unit.find({where:{sku:unit}}).catch(function (err, doc){
      if(err){
       console.log("error: ", err);
      }else{
        console.log("Success: ", doc);
      }
    });
  }


  _remove = function (data, success, fail){
  unit.find({where: {sku: unit.sku}}).then(function (err, data) {
    console.log("remove hit", data);
      if (err) {
          console.log("Error: ", err);
      } else {
          data.destroy({sku: unit.sku}).success(function (err, data) {
            console.log("Successful removal: ", data);
              if(err){
                  console.log(err);
              }else{
                  console.log('hits', data);
              }
          })
      }
      console.log(data);
  });
}
// _remove({sku:"220AbC"});
_addOne({sku:"abc123", qty_on_hand: 2, trigger_qty:3, replenish_qty:64});
_addOne({sku:"234AbC", qty_on_hand: 45, trigger_qty: 5, replenish_qty:100});
_findOne({sku:"220AbC"});
  return{
    all: _findAll,
    findOne: _findOne,
    remove: _remove
  }





}();