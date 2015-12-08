// Call upon the find one function
order.findOne({status.responseCode: 700}, function(data){
 res.json(data);
}, function(err, doc){
 console.log('err' + err + doc);
});
