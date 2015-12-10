/*
*
* Order Verification Pseudo Code
*
* Receive package, if package contents = order contents then set status
* of package to "Good" or "Verified", then send package out to shipping
*/

const order = [{
	item: "Toy",
	qty: 2
}];

const package = {
	item: "Toy",
	qty: 2
};


function verify () {
	if ( order[i].item === package[i].item && order[i].qty === package[i].qty ) {
		// Mark package as "verified"
		console.log("Package Verified");
		// Send to be used in shipping function
		shippingFunction();
	} else {
		// Call a problem solver to review package
		console.log('Problem Solver neeeded');
		// Once problem solved mark package as "verified"
		console.log("Package Verified")
	}
}

for (var i = 0; i < order.length; i += 1) {
	verify();
}
