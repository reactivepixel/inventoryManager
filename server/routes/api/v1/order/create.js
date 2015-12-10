// Gravity Application API orderCreate | API for adding order to database
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
module.exports = function (router) {

  // TODO: fix this page
  router.post('/create', function(req, res) {
    var orderPlacement = req.body;
    orderTracking = { status : 'packing', timestamp : 'today'};
    orderRecipient = orderPlacement.order.recipient;
    orderUnits = orderPlacement.order.units;

    var placement = {};
    placement.tracking = orderTracking;
    placement.recipient = orderRecipient;
    placement.unit = orderUnits;

    orderDatabase.push(placement);
    console.log(placement);

    res.json({
      serverResponse : "Your placement is being processed",
      orderDetails: placement
    });
  });

  return router;
};