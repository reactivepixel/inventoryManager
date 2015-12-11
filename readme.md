# Sol
The backend business logic for the **Sol Project**

## Install Locally

Clone the repo to your local machine

```
npm install
```

## Developing Locally

### Configure Database

make sure that mysql is installed

```
$ mysql --version

```

if its not installed

```
$ brew install mysql

```

login to your local mysql server create a database called gravity

```
$ mysql.server start
$ mysql -u root
$ mysql.server restart

mysql> create database gravity

```
Next create a .env file for your local environment variables

```
DB_HOST = 127.0.0.1
DB_NAME = gravity
MYSQL_NAME = {local user} // usually root
MYSQL_PASS = {local password} // standard install set to blank
DB_PORT = {local port running mysql} //standard port is 3306

```

### Installing and using Gulp
#### 1. Install gulp globally:
This step can be performed from any directory.

```
$ npm install --global gulp

```

#### 2. Ensure you have a `gulpfile.js` at the root of your project:
#### 3. Run gulp:

```
$ gulp
```

Once you have this completed your server should run great!

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
{'uuid': 'j1f4f2a2aa2a92637a2629c9ff2fe083a'}
```

### Dev Environment Setup

TODO Write Me


# API v1 Documentation

## Status Codes
| Status Code   | General Meaning | Reason                                  |
| ------------- | --------------  | --------------------------------------- |
| 100           | Picking         | Usually means 'continue' or 'processing'|
| 200           | Shipped         | Usually a 'success' message             |
| 300           | Packaging       | Usually means a 'redirect'              |
| 301           | Info Not Supplied | When an endpoint is expecting some piece of data (SKU for Instance) and the POST request did not contain the expected data.
| 400           | Not Found       | Usually an 'error'                      |
| 500           | Unavailable     | Usually a 'bad request'                 |
| 600           | Inspecting      |                                         |
| 700           | Shipping        |                                         |
| 800           | Incomplete      |                                         |
| 900           | Retired         | After it is out of our hands            |


* *This list can be changed, this is not set in stone. If you find that a status code would suit a different reason, let me know so that the proper changes can be made. The assigned status code decisions were made based on http status codes and somewhat an order in which they go through in the warehouse.*

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
| [Unit Receiving](#unit-receiving) | Returns all Units that are in Receiving |
| [Unit Available](#unit-available) | Returns all Units that are available for Picking |
| [Unit Picking](#unit-picking) | Returns all Units that are currently being Picked |
| [Unit Packaging](#unit-packaging) | Returns all Units that are currently being Packaged |
| [Unit Inspecting](#unit-inspecting) | Returns all Units that are currently being Inspected |
| [Unit Shipping](#unit-shipping) | Returns all Units that are currently being Shipped |
| [Unit Shipped](#unit-shipped) | Returns all Units that are have been Shipped |

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
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  	  quantity: 4
    }]
  }
}
```

##### Response

```javascript
{
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  status: {
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
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
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
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
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
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```javascript
{
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status: {
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
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```javascript
{
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status: {
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
  status: {
    responseCode: 200
  }
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
    uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
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
  status: {
    responseCode: 200
  }
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
    uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
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
  status: {
    responseCode: 200
  }
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
    uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
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
  status: {
    responseCode: 200
  }
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
    uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
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
  status: {
    responseCode: 200
  }
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
    uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
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
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      status: {
        responseCode: 200
      },
      recipient: {
        name: 'Jazy Jasilo',
        address: '3300 University Blvd, Winter Park, FL 32792',
        email: 'orange@fullsail.edu',
        phone: '555-555-5555'
      },
      units: [{
        uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
        quantity: 4
      }]
    }
  }
}
```

##### Response

```javascript
{
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status: {
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
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  package: {
    order: {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      status: {
        responseCode: 200
      },
      recipient: {
        name: 'Jazy Jasilo',
        address: '3300 University Blvd, Winter Park, FL 32792',
        email: 'orange@fullsail.edu',
        phone: '555-555-5555'
      },
      units: [{
        uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
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

A unit is created/entered into the db when a JSON object that matches the supplied example is sent to the endpoint. There should be logic in this model to check for the uuid in the db before attempting to Create a new record.

##### Request
An object is submitted to the db with uuid, initial quantity and the intial status code.

```javascript
{
  units: [
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 4,
      status: {
        responseCode: 200
      }
    }
  ]
}
```

##### Response

```javascript
{
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status: {
    responseCode: 200
  }
}
```

### Unit Find
| Endpoint | Method | Status |
|---|---|---|
| `unit/find` | `POST` | `STATUS` |

A specific unit record is retrieved assisting in discerning the location of the unit in the warehouse based on status code or pod affiliation.

##### Request
Units table is queried for units matching the uuid.

```javascript
{
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  units: [
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 10,
      status: {
        responseCode: 200
      },
      pod: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }
  ]
}
```

### Unit Update Inspect
| Endpoint | Method | Status |
|---|---|---|
| `unit/update/inspect` | `POST` | `STATUS` |

The status of a unit is updated during the inspection process to either "passed" or "failed." Because there are two inspection areas in the workflow this endpoint might need to be split into two separate ones to correlate with the actual inspection versus a general inspection.

#### Request
Units table is queried for units matching the uuid.

```javascript
{
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response
Returns an object containing the uuid queried and its' status code.

```javascript
{
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
  status: {
    responseCode: 200
  }
}
```

### Unit Update Qty
| Endpoint | Method | Status |
|---|---|---|
| `unit/update/qty` | `POST` | `STATUS` |

The quantity of a unit is updated during the receiving of units for replenishment.
The model for this will likely be very similar to the find method in that it takes the single uuid as an argument and returns info on that sku alone.

#### Request
Units table is queried for units matching the uuid.

```javascript
{
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response
The response contains all the new data on the unit after adding received units to inventory.

```javascript
{
  units: [{
    uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    quantity_on_hand: 8,
    trigger_qty: 3,
    replenish_qty: 5,
    status: {
      responseCode: 200
    }
  }]
}
```

### Unit Receiving
This might turn out to be what I wrote for Unit Qty Update above. Need feedback.

***

### Unit Available
| Endpoint | Method | Status |
|---|---|---|
| `unit/available` | `POST` | `STATUS` |

Available units are returned for a particular uuid.

#### Request
Units table is queried for records matching the uuid.

```javascript
{
  uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response
Returns an object containing the unit matching the uuid. Displays the `qty_on_hand`.

```javascript
{
  units: [{
    uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    qty_on_hand: 7
    status: {
      responseCode: 200
    }
  }]
}
```

### Unit Picking
| Endpoint | Method | Status |
|---|---|---|
| `unit/picking` | `POST` | `STATUS` |

#### Request
Units table is queried for units with a status code that indicates 'picking'.

```javascript
{
  units: {
    status: {
      responseCode: 200
    }
  }
}
```

#### Response
Returns an object containing all units with the status code corresponding to picking.

```javascript
{
  units: [
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 2
    },
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 1
    }
  ]
}
```

### Unit Packaging
| Endpoint | Method | Status |
|---|---|---|
| `unit/packaging` | `POST` | `STATUS` |

These units have passed through the post-picking inspection and are on their way to shipping.

#### Request
Units table is queried for all units with a status corresponding to packaging.

```javascript
{
  status: {
    responseCode: 200
  }
}
```

#### Response
Returns an object containing all units with the status code corresponding to packaging.

```javascript
{
  units: [
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 1
    },
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 2
    }
  ]
}
```

### Unit Inspecting
| Enpoint | Method | Status |
|---|---|---|
| `unit/inspecting` | `POST` | `STATUS` |

These units are involved in the receiving inspection or the post-picking inspection.

#### Request
Units table is queried for all units with a status corresponding to inspection.

```javascript
{
  status: {
    responseCode: 200
  }
}
```

#### Response
Returns an object containing all units with the status code corresponding to inspection.

```javascript
{
  units: [
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 3
    },
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 1
    }
  ]
}
```

### Unit Shipping

| Enpoint | Method | Status |
|---|---|---|
| `unit/shipping` | `POST` | `STATUS` |

These units are involved in the shipping stage.

#### Request
Units table is queried for all units with a status corresponding to shipping.

```javascript
{
  status: {
    responseCode: 200
  }
}
```

#### Response
Returns an object containing all units with the status code corresponding to shipping.

```javascript
{
  units: [
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 3
    },
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 1
    }
  ]
}
```

### Unit Shipped
| Enpoint | Method | Status |
|---|---|---|
| `unit/shipped` | `POST` | `STATUS` |

These units have been sucessfully shipped from the warehouse.

#### Request
Units table is queried for all units with a status corresponding to shipped.

```javascript
{
  status: {
    responseCode: 200
  }
}
```

#### Response
Returns an object containing all units with the status code corresponding to shipping.

```javascript
{
  units: [
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 3
    },
    {
      uuid: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      quantity: 1
    }
  ]
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

### How To Adapt the Model Template
To use the Unit model as a template for building out other models you will need to adjust the definition of your model in '/server/db.js'. It must contain the appropriate fields for your model to meet the documentation. `db.js` is just a rough structure and will need to be adjusted.

Copy `/server/models/unit.js` and rename it to match your model. You will need to restructure the definitions in this file to reflect the changes you have made to  `/server/db.js`

### Documentation
Each public method in `/server/models/unit.js` is documented according to the AirBNB Standards. Your own adaptation of this file means you will need to document its use. In your pull request if additional information is needed for team members to understand how to use your contributions please `mark it down` in the description of your pull request (just like I'm doing now). Additionally, copy / paste your modifications to the `/readme.md` file so this can be saved for later use by other devs.
