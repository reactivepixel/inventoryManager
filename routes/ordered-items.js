'use strict'
module.exports = function(express) {
  const router = express.Router();
  let itemsOrdered = require('../models/ordered-items.js');
  const db = require('../server/db.js');

  router.route('/')
    .get(function(req, res) {
      orderedItems.findAll(function(err) {
        res.status(500).json(err);
      }, function(data) {
        res.status(200).json(data);
      });
    })

  router.route('/:uuid')
    .put(function(req, res) {
      req.body.uuid = req.params.uuid;
      orderedItems.find(req.body, function(err) {
        res.status(500).json(err);
      }, function(data) {
        res.status(200).json(data);
      });
    })
    .delete(function(req, res) {
      req.body.uuid = req.params.uuid;
      orderedItems.destroy(req.body, function(err) {
        res.status(500).json(err);
      }, function(data) {
        res.status(200).json({success: data})
      })
    })
    .put(function(req, res) {
      req.body.uuid = req.params.uuid;
      orderedItems.update(req.body, function(err) {
        res.status(500).json(err);
      }, function(data) {
        res.status(200).json(data)
      })
    })
  return router;
}
