# Sol
The backend business logic for the **Sol Project**

## Install Locally

Clone the repo to your local machine

```
npm install
```

## Developing Locally

### Configure Database

login to your local mysql server create a database called gravity

```
mysql> create database gravity

```
Next create a .env file for your local environment variables

```
DB_HOST = 127.0.0.1
DB_NAME = gravity
MYSQL_NAME = {local user}
MYSQL_PASS = {local password}
DB_PORT = {local port running mysql}

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
How to locate an order based on id.
run server, npm server.js in gravity directory

make a post request to this url:
http://localhost:3000/api/v1/order/find
pass a JSON object in this structure:

```
{'orderId': 'j1f4f2a2aa2a92637a2629c9ff2fe083a'}
```

### Dev Environment Setup

TODO Write Me


# API v1 Documentation

All routes should be prefixed with ```/api/v1```

## Routes

### Routes - Orders
| Event | Definition |
|---|---|
| [Order Create](#order-create) | Add a new Order to the Database |
| [Order Find](#order-find) | Find an Order by Supplied Order ID |
| [Order Update Inspect](#order-update-inspect) | Update an Order based upon Inspection |
| [Order Update Ship](#order-update-ship) | Update an Order based upon Shipping |
| [Order Picking](#order-picking) | Returns all Orders that are currently being Picked |
| [Order Packaging](#order-packaging) | Returns all Orders that are currently being Packaged |
| [Order Inspecting](#order-inspection) | Returns all Orders that are currently being Inspected |
| [Order Shipping](#order-shipping) | Returns all Orders that are currently being Shipped |
| [Order Shipped](#order-shipped) | Returns all Orders that are have been Shipped |

### Routes - Packages
| Event | Definition |
|---|---|
| [Package Create](#package-create) | Add a new Package to the Database |
| [Package Find](#Package-find) | Find a Package by Supplied Package ID |

### Routes - Units
| Event | Definition |
|---|---|
| [Unit Create](#unit-create) | Add a new Unit to the Database |
| [Unit Find](#unit-find) | Find a Unit by Supplied Unit ID |
| [Unit Update Inspect](#unit-update-inspect) | Update a Unit based upon Inspection |
| [Unit Update Qty](#unit-update-qty) | Update Unit quantity during Receiving |
| [Unit Receiving](#unit-recieving) | Returns all Units that are in Receiving |
| [Unit Available](#unit-available) | Returns all Units that are available for Picking |
| [Unit Picking](#unit-picking) | Returns all Units that are currently being Picked |
| [Unit Packaging](#unit-packaging) | Returns all Units that are currently being Packaged |
| [Unit Inspecting](#order-inspection) | Returns all Units that are currently being Inspected |
| [Unit Shipping](#order-shipping) | Returns all Units that are currently being Shipped |
| [Unit Shipped](#order-shipped) | Returns all Units that are have been Shipped |

### Routes - SKUs
| Event | Definition |
|---|---|
| [SKU Create](#sku-freate) | Add a new SKU to the Database |
| [SKU Find](#sku-find) | Find a SKU by Supplied SKU |

### Routes - Shipments
| Event | Definition |
|---|---|
| [Shipment Create](#shipment-create) | Add a new Shipment to the Database |
| [Shipment Find](#shipment-find) | Find a Shipment by Supplied Shipment ID |
| [Shipment Loading](#shipment-loading) | Find the Shipment currently being loaded |
| [Shipment Recieving](#shipment-recieving) | Find all Shipments in Recieving |

### Routes - Workers
| Event | Definition |
|---|---|
| [Worker Find](#worker-find) | Find a Worker by Supplied Worker ID |
| [Worker Available](#worker-available) | Returns all Workers that are available for Jobs |
| [Worker Occupied](#worker-occupied) | Returns all Workers that are occupied and thier current Jobs |
| [Worker Inspection](#worker-inspection) | Returns all Workers assigned to Inspection and their current Status |
| [Worker Picking](#worker-picking) | Returns all Workers assigned to Picking and their current Status |
| [Worker Packaging](#worker-packaging) | Returns all Workers assigned to Packaging and their current Status |
| [Worker Shipping](#worker-shipping) | Returns all Workers assigned to Shipping and their current Status |

### Routes - Pods
| Event | Definition |
|---|---|
| [Pod Find](#pod-find) | Find a Pod by Supplied Pod ID |
| [Pod Available](#pod-available) | Returns all Pods that are available for Units |
| [Pod Loading](#pod-loading) | Returns all Pods that being Loaded |
| [Pod Picking](#pod-picking) | Returns all Pods assigned to Picking |
| [Pod Maintenance](#pod-maintenance) | Returns all Pods in Maintenance |

## Order Object Definitions
### Order Create
| Endpoint | Method | Status |
|---|---|---|
| `order/create` | `POST` | `STATUS` |

An order is created when a JSON object that matches the supplied example is sent to the endpoint.

##### Request

```javascript
{
  order: {
    recipient: {
  	  name: 'Jazy Jasilo',
  	  address: '3300 University Blvd, Winter Park, FL 32792',
  	  email: 'orange@fullsail.edu',
  	  phone: '555-555-5555'
    },
    units: [{
      unitId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  	  quantity: 4
    }]
  }
}
```

##### Response

```javascript
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  status : {
    responseCode: 200
  }
}
```

### Order Find
| Endpoint | Method | Status |
|---|---|---|
| `order/find` | `POST` | `STATUS` |

An order is retrieved when a JSON object that contains an `uuid` is sent to the endpoint.

##### Request

```javascript
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  order: {
    recipient: {
  	  name: 'Jazy Jasilo',
  	  address: '3300 University Blvd, Winter Park, FL 32792',
  	  email: 'orange@fullsail.edu',
  	  phone: '555-555-5555'
    },
    units: [{
      unitId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  	  quantity: 4
    }]
  }
}
```

### Order Update Inspect
| Endpoint | Method | Status |
|---|---|---|
| `order/update/inspect` | `POST` | `STATUS` |

The status of an order is updated during the inspection process to either "shipping" or "failed."

#### Request

```javascript
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```javascript
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status : {
    responseCode: 200
  }
}
```

### Order Update Ship
| Endpoint | Method | Status |
|---|---|---|
| `order/update/ship` | `POST` | `STATUS` |

The status of an order is updated during the shipping process to either "shipped."  The shipping method and tracking number is added.

#### Request

```javascript
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```javascript
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
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
| Endpoint | Method | Status |
|---|---|---|
| `order/picking` | `POST` | `STATUS` |

All orders with a status of "picking" are returned.  A total of all orders is also returned.

#### Request

```javascript
{
  status : {
    responseCode: 200
  }
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
      orderId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }]
}
```

### Order Packaging
| Endpoint | Method | Status |
|---|---|---|
| `order/packaging` | `POST` | `STATUS` |

All orders with a status of "packaging" are returned.  A total of all orders is also returned.

#### Request

```javascript
{
  status : {
    responseCode: 200
  }
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
      orderId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }]
}
```

### Order Inspecting
| Enpoint | Method | Status |
|---|---|---|
| `order/inspecting` | `POST` | `STATUS` |

All orders with a status of "inspecting" are returned.  A total of all orders is also returned.

#### Request

```javascript
{
  status : {
    responseCode: 200
  }
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
      orderId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }]
}
```

### Order Shipping

| Enpoint | Method | Status |
|---|---|---|
| `order/shipping` | `POST` | `STATUS` |

All orders with a status of "shipping" are returned.  A total of all orders is also returned.

#### Request

```javascript
{
  status : {
    responseCode: 200
  }
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
      orderId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }]
}
```

### Order Shipped
| Enpoint | Method | Status |
|---|---|---|
| `order/shipped` | `POST` | `STATUS` |

All orders with a status of "shipped" are returned.  A total of all orders is also returned.

#### Request

```javascript
{
  status : {
    responseCode: 200
  }
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
      orderId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }]
}
```

## Package Object Definitions
### Package Create
| Endpoint | Method | Status |
|---|---|---|
| `package/create` | ```POST` | `STATUS` |

A package is created when a JSON object that matches the supplied example is sent to the endpoint.

##### Request

```javascript
{
  package: {
    order: {
      uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      status : {
        responseCode: 200
      },
      recipient: {
        name: 'Jazy Jasilo',
        address: '3300 University Blvd, Winter Park, FL 32792',
        email: 'orange@fullsail.edu',
        phone: '555-555-5555'
      },
      units: [{
        unitId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
        quantity: 4
      }]
    }
  }
}
```

##### Response

```javascript
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status : {
    responseCode: 200
  }
}
```

### Package Find
| Enpoint | Method | Status |
|---|---|---|
| `package/find` | `POST` | `STATUS` |

An order is retrieved when a JSON object that contains an `uuid` is sent to the endpoint.

##### Request

```javascript
{
  uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  package: {
    order: {
      uuid : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      status : {
        responseCode: 200
      },
      recipient: {
        name: 'Jazy Jasilo',
        address: '3300 University Blvd, Winter Park, FL 32792',
        email: 'orange@fullsail.edu',
        phone: '555-555-5555'
      },
      units: [{
        unitId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
        quantity: 4
      }]
    }
  }
}
```

## Unit Object Definitions

### Unit Create
| Endpoint | Method | Status |
|---|---|---|
| `unit/create` | `POST` | `STATUS` |

A unit is created/entered into the db when a JSON object that matches the supplied example is sent to the endpoint.

##### Request

```javascript
{
  units: [{
    unitId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    quantity: 4
  }]
}
```

##### Response

```javascript
{
  unitId : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  status : {
    responseCode: 200
  }
}
```

### Unit Find
| Endpoint | Method | Status |
|---|---|---|
| `unit/find` | `POST` | `STATUS` |

An unit record is retrieved when a JSON object that contains a `unitId` is sent to the endpoint.

##### Request

```javascript
{
  unitId : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  units: [{
    unitId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    quantity: 4
  }]
}
```

### Unit Update Inspect
| Endpoint | Method | Status |
|---|---|---|
| `unit/update/inspect` | `POST` | `STATUS` |

The status of a unit is updated during the inspection process to either "shipping" or "failed."

#### Request

```javascript
{
  unitId : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```javascript
{
  unitId : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status : {
    responseCode: 200
  }
}
```

### Unit Update Qty
| Endpoint | Method | Status |
|---|---|---|
| `unit/update/qty` | `POST` | `STATUS` |

The quantity of a unit is updated during the receiving of units for replenishment."

#### Request

```javascript
{
  unitId : 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  quantity: 4
}
```

#### Response

```javascript
{
  units: [{
    unitId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    quantity: 4,
    status : {
      responseCode: 200
    }
  }]
}
```

## Database Model Usage
Include the model and as it is self contained you can directly access the methods retuned by it. Ideally require the model into the desired `route file` and run the appropriate method depending on the route specified.

```javascript
var unit = require('./server/models/unit.js');
```

// Add Unit with Success and Failure. Note if a sku is not supplied, one is generated.

```javascript
unit.add({qty_on_hand: 3, trigger_qty:4, replenish_qty:5}, function(data){
  console.log('Added Unit');
}, function(err){
  console.log('Adding Error-' + err);
});
```

// Return all Units with Success and Failure

```javascript
unit.all(function(data){
  res.json(data);
}, function(err){
  console.log('err' + err);
});
```

### How To Adapt
To use the Unit model as a template and start building out other models you will need to adjust the definition of your model in '/server/db.js' to contain the appropriate fields to your model to meet the documentation. `db.js` is just a rough structure and will need adjusted.

Copy `/server/models/unit.js` and rename it to match your model. You will need to restructure the definitions in this file to reflect the changes you have made to  `/server/db.js`

### Documentation
Each public method in `/server/models/unit.js` is documented according to the AirBNB Standards. Your own adaptation of this file means you will need to document its use. In your pull request if additional information is needed for team members to understand how to use your contributions please `mark it down` in the description of your pull request (just like I'm doing now). Additionally, copy / paste your modifications to the `/readme.md` file so this can be saved for use later by other devs.
