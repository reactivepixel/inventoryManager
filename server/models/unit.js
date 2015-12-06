module.export = function (){
  var db = require('../db.js')();
  var mysql = require('mysql');
  var env = process.env;
  var data = require('../../lib/sanitize.js');
  var Sequelize = require('sequelize');
  var express = require('express');
  var req = require('body-parser');
  var sequelize = db.connection;

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
_addOne = function(data, success, fail){
unit.sync({force:true}).then(function(){
  unit.create({
    sku: unit.sku,
    qty_on_hand: unit.qty_on_hand,
    trigger_qty:unit.trigger_qty,
    replenish_qty:unit.replenish_qty
  }).then(function (data){
     data.save();
    console.log("success")
  }).catch(function (err){
    console.log("error", err)
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
_remove({sku:"220AbC"});
_addOne({sku:"676GHY", qty_on_hand: 3, trigger_qty:4, replenish_qty:5});
  return{
    all: _findAll,
    findOne: _findOne,
    remove: _remove
  }





}();