# Sol
The backend business logic for the **Sol Project**

## Install Locally

Clone the repo to your local machine

```
npm install
```

## Developing Locally

```
npm start
```

## Environments
Here are links to all Environments.

### Development
Link to [Development](https://sol-gravity-development.herokuapp.com)

### Staging
Link to [Staging](https://sol-gravity-staging.herokuapp.com)

### Production
Link to [Production](https://sol-gravity-production.herokuapp.com)

### API list Documentation
How to get a list of all orders in the database
run server, npm server.js in gravity directory

navigate to http://localhost:3000/api/v1/order/find

### API find Documentation
How to locate a order based on id.
run server, npm server.js in gravity directory

make a post request to this url:
http://localhost:3000/api/v1/order/find
pass a JSON object in this structure:

```
{'orderId' : 'j1f4f2a2aa2a92637a2629c9ff2fe083a'}
```

### Dev Environment Setup

TODO Write Me


# API v1 Documentation

All routes should be prefixed with ```/api/v1```

## Routes

### Routes - Orders
| Event | Definition |
|---|---|
| [Order Create](#Order-Create) | Add a new Order to the Database |
| [Order Find](#Order-Find) | Find an Order by Supplied Order ID |
| [Order Update Inspect](#Order-Update-Inspect) | Update an Order based upon Inspection |
| [Order Update Ship](#Order-Update-Ship) | Update an Order based upon Shipping |
| [Order Picking](#Order-Picking) | Returns all Orders that are currently being Picked |
| [Order Packaging](#Order-Packaging) | Returns all Orders that are currently being Packaged |
| [Order Inspecting](#Order-Inspection) | Returns all Orders that are currently being Inspected |
| [Order Shipping](#Order-Shipping) | Returns all Orders that are currently being Shipped |
| [Order Shipped](#Order-Shipped) | Returns all Orders that are have been Shipped |

### Routes - Packages
| Event | Definition |
|---|---|
| [Package Create](#Package-Create) | Add a new Package to the Database |
| [Package Find](#Package-Find) | Find a Package by Supplied Package ID |

### Routes - Units
| Event | Definition |
|---|---|
| [Unit Create](#Unit-Create) | Add a new Unit to the Database |
| [Unit Find](#Unit-Find) | Find a Unit by Supplied Unit ID |
| [Unit Update Inspect](#Unit-Update-Inspect) | Update a Unit based upon Inspection |
| [Unit Receiving](#Unit-Recieving) | Returns all Units that are in Receiving |
| [Unit Available](#Unit-Available) | Returns all Units that are available for Picking |
| [Unit Picking](#Unit-Picking) | Returns all Units that are currently being Picked |
| [Unit Packaging](#Unit-Packaging) | Returns all Units that are currently being Packaged |
| [Unit Inspecting](#Order-Inspection) | Returns all Units that are currently being Inspected |
| [Unit Shipping](#Order-Shipping) | Returns all Units that are currently being Shipped |
| [Unit Shipped](#Order-Shipped) | Returns all Units that are have been Shipped |

### Routes - SKUs
| Event | Definition |
|---|---|
| [SKU Create](#SKU-Create) | Add a new SKU to the Database |
| [SKU Find](#SKU-Find) | Find a SKU by Supplied SKU |

### Routes - Shipments
| Event | Definition |
|---|---|
| [Shipment Create](#Shipment-Create) | Add a new Shipment to the Database |
| [Shipment Find](#Shipment-Find) | Find a Shipment by Supplied Shipment ID |
| [Shipment Loading](#Shipment-Loading) | Find the Shipment currently being loaded |
| [Shipment Recieving](#Shipment-Recieving) | Find all Shipments in Recieving |

### Routes - Workers
| Event | Definition |
|---|---|
| [Worker Find](#Worker-Find) | Find a Worker by Supplied Worker ID |
| [Worker Available](#Worker-Available) | Returns all Workers that are available for Jobs |
| [Worker Occupied](#Worker-Occupied) | Returns all Workers that are occupied and thier current Jobs |
| [Worker Inspection](#Worker-Inspection) | Returns all Workers assigned to Inspection and their current Status |
| [Worker Picking](#Worker-Picking) | Returns all Workers assigned to Picking and their current Status |
| [Worker Packaging](#Worker-Packaging) | Returns all Workers assigned to Packaging and their current Status |
| [Worker Shipping](#Worker-Shipping) | Returns all Workers assigned to Shipping and their current Status |

### Routes - Pods
| Event | Definition |
|---|---|
| [Pod Find](#Pod-Find) | Find a Pod by Supplied Pod ID |
| [Pod Available](#Pod-Available) | Returns all Pods that are available for Units |
| [Pod Loading](#Pod-Loading) | Returns all Pods that being Loaded |
| [Pod Picking](#Pod-Picking) | Returns all Pods assigned to Picking |
| [Pod Maintenance](#Pod-Maintenance) | Returns all Pods in Maintenance |

### Order Create
| Endpoint | Method |
|---|---|
| ```order/create``` | ```POST``` |

An order is created when a JSON object that matches the supplied example is sent to the endpoint.

##### Request

```
{
  order: {
    recipient: {
  	  name: 'Jazy Jasilo',
  	  address: '3300 University Blvd, Winter Park, FL 32792',
  	  email: 'orange@fullsail.edu',
  	  phone: '555-555-5555'
    },
    units: \[{
      unitId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  	  quantity: 4
    }\]
  }
}
```

##### Response

```
{
  uuid : a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status : {
    responseCode: 200
  }
}
```

### Order Find
| Enpoint | Method |
|---|---|
| ```order/find``` | ```POST``` |

An order is retrieved when a JSON object that contains an ```uuid``` is sent to the endpoint.

##### Request

```
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```
{
  order: {
    recipient': {
  	  name: 'Jazy Jasilo',
  	  address: '3300 University Blvd, Winter Park, FL 32792',
  	  email: 'orange@fullsail.edu',
  	  phone: '555-555-5555'
    },
    units: \[{
      unitId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  	  quantity: 4
    }\]
  }
}
```

### Order Update Inspect
| Enpoint | Method |
|---|---|
| ```order/update/inspect``` | ```POST``` |

The status of an order is updated during the inspection process to either "shipping" or "failed."

#### Request

```
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```
{
  uuid : a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status : {
    responseCode: 200
  }
}
```

### Order Update Ship
| Enpoint | Method |
|---|---|
| ```order/update/ship``` | ```POST``` |

The status of an order is updated during the shipping process to either "shipped."  The shipping method and tracking number is added.

#### Request

```
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```
{
  uuid : a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status : {
    responseCode: 200
  },
  shipping:{
    method:  'UPS',
    trackingNum: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  }
}
```

### Order Picking
| Enpoint | Method |
|---|---|
| ```order/picking``` | ```POST``` |

All orders with a status of "picking" are returned.  A total of all orders is also returned.

#### Request
```
{
  status : {
    responseCode: 200
  }
}
```

#### Response
```
{
  totalOrders: '300',
  orders: \[{
      orderId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }\]
}
```    

### Order Packaging
| Enpoint | Method |
|---|---|
| ```order/packaging``` | ```POST``` |

All orders with a status of "packaging" are returned.  A total of all orders is also returned.

#### Request
```
{
  status : {
    responseCode: 200
  }
}
```

#### Response
```
{
  totalOrders: '300',
  orders: \[{
      orderId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }\]
}
```   

### Order Inspecting
| Enpoint | Method |
|---|---|
| ```order/inspecting``` | ```POST``` |

All orders with a status of "inspecting" are returned.  A total of all orders is also returned.

#### Request
```
{
  status : {
    responseCode: 200
  }
}
```

#### Response
```
{
  totalOrders: '300',
  orders: \[{
      orderId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }\]
}
```  

### Order Shipping

| Enpoint | Method |
|---|---|
| ```order/shipping``` | ```POST``` |

All orders with a status of "shipping" are returned.  A total of all orders is also returned.

#### Request
```
{
  status : {
    responseCode: 200
  }
}
```

#### Response
```
{
  totalOrders: '300',
  orders: \[{
      orderId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }\]
}
```  

### Order Shipped
| Enpoint | Method |
|---|---|
| ```order/shipped``` | ```POST``` |

All orders with a status of "shipped" are returned.  A total of all orders is also returned.

#### Request
```
{
  status : {
    responseCode: 200
  }
}
```

#### Response
```
{
  totalOrders: '300',
  orders: \[{
      orderId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }\]
}
```  
