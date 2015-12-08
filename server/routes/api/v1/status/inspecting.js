// Call upon the find one function
order.findOne({status.responseCode: 600}, function(data){
 res.json(data);
}, function(err, doc){
 console.log('err' + err + doc);
});
