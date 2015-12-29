# Sol
The backend business logic for the **Sol Project**

## Initial Project Setup Instructions
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

### Updating your database after any schema changes in only 7 steps

STEP 1: `git pull origin master`

STEP 2: `npm install`

STEP 3: `mysql.server restart`

STEP 4: `mysql -u root;`

STEP 5: `mysql> drop database gravity;`

STEP 6: `mysql> create database gravity;`

STEP 7: `gulp dev`

#### Or you can update your database in 1 step

run `bash db_update.sh` in your local repo and watch the magic happen!

## Server Environments
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
| 101           | Available       |                                         |
| 200           | Shipped         | Usually a 'success' message             |
| 201           | Received        |                                         |
| 202           | Loading         |                                         |
| 300           | Packaging       | Usually means a 'redirect'              |
| 301           | Info Not Supplied | When an endpoint is expecting some piece of data (SKU for Instance) and the POST request did not contain the expected data.
| 400           | Not Found       | Usually an 'error'                      |
| 500           | Unavailable     | Usually a 'bad request'                 |
| 600           | Inspecting      |                                         |
| 601           | Maintenance     |                                         |
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
| [Unit Update Replenish](#unit-update-replenish) | Update Unit quantity during Receiving |
| [Unit Receiving](#unit-receiving) | Returns all Units that are in Receiving |
| [Unit Available](#unit-available) | Returns all Units that are available for Picking |
| [Unit Picking](#unit-picking) | Returns all Units that are currently being Picked |
| [Unit Packaging](#unit-packaging) | Returns all Units that are currently being Packaged |
| [Unit Inspecting](#unit-inspecting) | Returns all Units that are currently being Inspected |
| [Unit Shipping](#unit-shipping) | Returns all Units that are currently being Shipped |
| [Unit Shipped](#unit-shipped) | Returns all Units that are have been Shipped |

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
| [Worker Find](#worker-find) | Returns a record of an individual Worker by workerId |
| [Worker Available](#worker-available) | Returns all Workers that are available for Jobs |
| [Worker Occupied](#worker-occupied) | Returns all assigned Workers and any associated orders |
| [Worker Inspecting](#worker-inspection) | Returns all Workers assigned to Inspecting and their current Status |
| [Worker Picking](#worker-picking) | Returns all Workers assigned to Picking and their current Status |
| [Worker Packaging](#worker-packaging) | Returns all Workers assigned to Packaging and their current Status |
| [Worker Shipping](#worker-shipping) | Returns all Workers assigned to Shipping and their current Status |

### Routes - Pods
| Event | Definition |
|---|---|
| [Pod Find](#pod-find) | Returns a record of an individual Pod by podId |
| [Pod Available](#pod-available) | Returns all Pods with payload availability |
| [Pod Loading](#pod-loading) | Returns all Pods that being Loaded |
| [Pod Picking](#pod-picking) | Returns all Pods assigned to Picking |
| [Pod Maintenance](#pod-maintenance) | Returns all Pods in Maintenance |

## Order Object Definitions
### Order Create
| Endpoint | Method | Development Status |
|---|---|:---:|
| `order/create` | `POST` | Not Started |

Add a new Order to the Database.

##### Request

```javascript
{
  orders: {
    recipients: {
  	  name: 'Jazy Jasilo',
  	  address: '3300 University Blvd',
      city: 'Winter Park',
      state: 'FL',
      zip: '32792',
  	  phone: '555-555-5555'
    },
    units: [{
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    }],
    shipping_method: shipCode
  }
}
```

##### Response

```javascript
{
  orders: {
    order_id: 'giberish',
    recipient_id: 'giberish',
    units: [{
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }],
    shipping_method: shipCode,
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    success: TRUE or FALSE
  }
}
```

### Order Find
| Endpoint | Method | Development Status |
|---|---|:---:|
| `order/find` | `POST` | Not Started |

Returns a record of an individual Order by order_id.

##### Request

```javascript
{
  order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  orders: {
    order_id: 'giberish',
    recipient_id: 'giberish',
    units: [{
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }],
    shipping_method: shipCode,
    createdAt: 'timestamp',
    updatedAt: 'timestamp',
    success: TRUE or FALSE
  }
}
```

### Order Update Inspect
| Endpoint | Method | Development Status |
|---|---|:---:|
| `order/update/inspect` | `POST` | Not Started |

The status of an order is updated during the inspection process to either "shipping" or "failed."

#### Request

```javascript
{
  order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```javascript
{
  orders: {
    order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  },
  success: TRUE or FALSE
}
```

### Order Update Ship
| Endpoint | Method | Development Status |
|---|---|:---:|
| `order/update/ship` | `POST` | Not Started |

The status of an order is updated during the shipping process to "shipped." The shipping method and tracking number is added to the record.

#### Request

```javascript
{
  order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```javascript
{
  orders: {
    order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    shipping_method:  'UPS',
    shipping_tracking: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  },
  success: TRUE or FALSE
}
```

### Order Picking
| Endpoint | Method | Development Status |
|---|---|:---:|
| `order/picking` | `POST` | Not Started |

Returns all orders with a status of "picking" by status code.

#### Request

```javascript
{
  status: 102
}
```

#### Response

```javascript
{
  totalOrders: 2,
  orders: [
    {
      order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    },
    {
      order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }
  ]
}
```

### Order Packaging
| Endpoint | Method | Development Status |
|---|---|:---:|
| `order/packaging` | `POST` | Not Started |

Returns all orders with a status of "packaging" by status code.  A total of all orders is also returned.

#### Request

```javascript
{
  status: 103
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
    order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  }]
}
```

### Order Inspecting
| Enpoint | Method | Development Status |
|---|---|:---:|
| `order/inspecting` | `POST` | Not Started |

Returns all orders with a status of "inspecting" by status code.  A total of all orders is also returned.

#### Request

```javascript
{
  status: 104
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
    order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  }]
}
```

### Order Shipping

| Enpoint | Method | Development Status |
|---|---|:---:|
| `order/shipping` | `POST` | Not Started |

Returns all orders with a status of "shipping" by status code.  A total of all orders is also returned.

#### Request

```javascript
{
  status: 105
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
    order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  }]
}
```

### Order Shipped
| Enpoint | Method | Development Status |
|---|---|:---:|
| `order/shipped` | `POST` | Not Started |

Returns all orders with a status of "shipped" by status code.  A total of all orders is also returned.

#### Request

```javascript
{
  status: 106
}
```

#### Response

```javascript
{
  totalOrders: 300,
  orders: [{
    order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  }]
}
```

## Package Object Definitions
### Package Create
| Endpoint | Method | Development Status |
|---|---|:---:|
| `package/create` | ```POST` | Not Started |

A package is created when a JSON object that matches the supplied example is sent to the endpoint.

##### Request

```javascript
{
  order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  pkgs: {
    order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    pkg_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    pkg_units: [{
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    }],
    success: TRUE or FALSE
  }
}
```

### Package Find
| Enpoint | Method | Development Status |
|---|---|:---:|
| `package/find` | `POST` | Not Started |

Returns a record of an individual package by pkg_id.

##### Request

```javascript
{
  pkg_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  pkgs: {
    order_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    pkg_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    pkg_units: [{
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    }]
  }
}
```

## Unit Object Definitions

### Unit Create
| Endpoint | Method | Development Status |
|---|---|:---:|
| `unit/create` | `POST` | Not Started |

Add a new Unit to the Database

##### Request

```javascript
{
  units: [
    {
      available_qty: NULL,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2
    }
  ]
}
```

##### Response

```javascript
{
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      available_qty: 5,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2,
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
      success: TRUE or FALSE
    }
  ]
}
```

### Unit Find
| Endpoint | Method | Development Status |
|---|---|:---:|
| `unit/find` | `POST` | Not Started |

Returns a record of an individual Unit by sku.

##### Request

```javascript
{
  sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      available_qty: 5,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2,
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
      status: 200 - 206
    }
  ]
}
```

### Unit Update Inspect
| Endpoint | Method | Development Status |
|---|---|:---:|
| `unit/update/inspect` | `POST` | Not Started |

The status of a unit is updated during the inspection process to either "passed" or "failed." Because there are two inspection areas in the workflow this endpoint might need to be split into two separate ones to correlate with the actual inspection versus a general inspection.

#### Request

```javascript
{
  sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```javascript
{
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      available_qty: 5,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2,
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
    }
  ],
  success: TRUE or FALSE
}
```

### Unit Update Replenish
| Endpoint | Method | Development Status |
|---|---|:---:|
| `unit/update/replenish` | `POST` | Not Started |

The quantity of a unit is updated during the receiving of units for replenishment.
The model for this will likely be very similar to the find method in that it takes the single sku as an argument and returns info on that sku alone.

#### Request

```javascript
{
  sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```javascript
{
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      available_qty: 5,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2,
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  ],
  success: TRUE or FALSE
}
```

### Unit Receiving
(needs differentiation from previous endpoint)

| Endpoint | Method | Development Status |
|---|---|:---:|
| `unit/receiving` | `POST` | Not Started |

Returns all units with a status of receiving by status code.

##### Request

```javascript
  status: 200
```

##### Response

```javascript
{
  totalUnits: 2,
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    },
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }
  ]
}
```

### Unit Available
| Endpoint | Method | Development Status |
|---|---|:---:|
| `unit/available` | `POST` | Not Started |

Returns all available units by sku.

#### Request

```javascript
{
  sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

#### Response

```javascript
{
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      available_qty: 5,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2,
      createdAt: 'timestamp',
      updatedAt: 'timestamp',
      status: 201
    }
  ]
}
```

### Unit Picking
| Endpoint | Method | Development Status |
|---|---|:---:|
| `unit/picking` | `POST` | Not Started |

Returns all units with a status of picking by status code.

#### Request

```javascript
{
  units: {
    status: 202
  }
}
```

#### Response

```javascript
{
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      available_qty: 5,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2,
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  ]
}
```

### Unit Packaging
| Endpoint | Method | Development Status |
|---|---|:---:|
| `unit/packaging` | `POST` | Not Started |

Returns all units with a status of packaging by status code. These units have passed through the post-picking inspection and are on their way to shipping.

#### Request

```javascript
{
  status: 203
}
```

#### Response

```javascript
{
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      available_qty: 5,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2,
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  ]
}
```

### Unit Inspecting
| Enpoint | Method | Development Status |
|---|---|:---:|
| `unit/inspecting` | `POST` | Not Started |

Returns all units with the status of inspecting by status code. These units are involved in the receiving inspection or the post-picking inspection.

#### Request

```javascript
{
  status: 204
}
```

#### Response

```javascript
{
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      available_qty: 5,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2,
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  ]
}
```

### Unit Shipping

| Enpoint | Method | Development Status |
|---|---|:---:|
| `unit/shipping` | `POST` | Not Started |

Returns all units with a status of shipping by status code.

#### Request

```javascript
{
  status: 205
}
```

#### Response

```javascript
{
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      available_qty: 5,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2,
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  ]
}
```

### Unit Shipped
| Enpoint | Method | Development Status |
|---|---|:---:|
| `unit/shipped` | `POST` | Not Started |

Returns all units with a status of shipped by status code. These units have been sucessfully shipped from the warehouse.

#### Request

```javascript
{
  status: 206
}
```

#### Response

```javascript
{
  units: [
    {
      sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      available_qty: 5,
      trigger_qty: 3,
      replenish_qty: 5,
      description: 'Blah, Blah, Blah',
      weight_lbs: 2,
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    }
  ]
}
```

## Shipment Object Definitions

### Shipment Create
| Endpoint | Method | Development Status |
|---|---|:---:|
| `shipment/create` | `POST` | Not Started |

A shipment is created/entered into the db (shipments table) when a JSON object that matches the supplied example is sent to the endpoint. There should be logic in this model to check for the ship_id in the db before attempting to Create a new record.

##### Request
An object is submitted to the db with ship_id, associated pkg_id, order_id and default initial status.

```javascript
{
  shipments: {
    ship_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    pkg_id: 'package01',
    order_id: 'order01'
  }
}
```

##### Response

```javascript
{
  shipments: {
    ship_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    pkg_id: 'package01',
    order_id: 'order01',
    units: [
      {
        sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
        quantity: 10
      }
    ],
    recipient: {
      name: 'Jazy Jasilo',
      address: '3300 University Blvd, Winter Park, FL 32792',
      email: 'orange@fullsail.edu',
      phone: '555-555-5555'
    },
    ship_method: 'method_id',
    success: TRUE or FALSE
  }
}
```

### Shipment Find
| Endpoint | Method | Development Status |
|---|---|:---:|
| `shipment/find` | `POST` | Not Started |

Returns a record of an individual Shipment by ship_id.

##### Request
Shipment table is queried for units matching the ship_id.

```javascript
{
  ship_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  shipments: {
    ship_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    pkg_id: 'package01',
    order_id: 'order01',
    units: [
      {
        sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
        quantity: 10
      }
    ],
    recipient: {
      name: 'Jazy Jasilo',
      address: '3300 University Blvd, Winter Park, FL 32792',
      email: 'orange@fullsail.edu',
      phone: '555-555-5555'
    },
    ship_method: 'method_id',
    status: 300 - 301
  }
}
```

### Shipment Loading
| Endpoint | Method | Development Status |
|---|---|:---:|
| `shipment/loading` | `POST` | Not Started |

A list of all shipments being loaded on trucks is retrieved.

##### Request
Shipments table is queried for records matching the status code indicating package has passed all QA and is ready for departure.

```javascript
  status: 300
```

##### Response

```javascript
{
  shipments: [
    {
      ship_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      pkg_id: 'package01',
      order_id: 'order01',
      units: [
        {
          sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
          quantity: 10
        }
      ],
      recipient: {
        name: 'Jazy Jasilo',
        address: '3300 University Blvd, Winter Park, FL 32792',
        email: 'orange@fullsail.edu',
        phone: '555-555-5555'
      },
      ship_method: 'method_id'
    }
  ]
}
```

### Shipment Receiving
| Endpoint | Method | Development Status |
|---|---|:---:|
| `shipment/receiving` | `POST` | Not Started |

A list of all shipments in receiving is retrieved.

##### Request
Shipments table is queried for records matching the status code indicating package has arrived at warehouse.

```javascript
  status: 301
```

##### Response

```javascript
{
  shipments: [
    {
      ship_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      units: [
        {
          sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
          quantity: 10
        }
      ]
    }
  ]
}
```

## Worker Object Definitions
### Worker Find
| Endpoint | Method | Development Status |
|---|---|:---:|
| `worker/find` | `POST` | Not Started |

Returns a record of an individual Worker by worker_id.

##### Request

```javascript
{
  workers: {
    worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
  }
}
```

##### Response

```javascript
{
  workers: {
    worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    status: 400 - 401,
    job_id: {
      statusCode: NEED TO CREATE A CODE FOR UNASSIGNED STATUS AND ALLOW FOR IT HERE
    },
    orders: {
      order_id: ... THIS CAN BE POPULATED OR EMPTY DEPENDING
    }
  }
}
```

### Worker Available
| Endpoint | Method | Development Status |
|---|---|:---:|
| `worker/available` | `POST` | Not Started |

Returns a list of all Workers that are available for assignment.

#### Request

```javascript
{
  workers: {
    status: 400
  }
}
```

#### Response

```javascript
{
  workers: [
    {
      worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    },
    {
      worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }
  ]
}
```

### Worker Occupied
| Endpoint | Method | Development Status |
|---|---|:---:|
| `worker/occupied` | `POST` | Not Started |

Returns all assigned Workers and any associated orders.

#### Request

```javascript
{
  workers: {
    status: 401
  }
}
```

#### Response

```javascript
{
  workers: {
    worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    name: 'giberish',
    status: 402 - 405,
    job_id: THIS COULD BE UNDERSTOOD BY STATUS,
    orders: {
      order_id: ...
    }
  }
}
```

### Worker Inspecting
| Enpoint | Method | Development Status |
|---|---|:---:|
|  `worker/inspecting` | `POST` | Not Started |

All workers with a status of "inspecting" are returned.

#### Request

```javascript
{
  workers: {
    status: 402
  }
}
```

#### Response

```javascript
{
  workers: [
    {
      worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    },
    {
      worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }
  ]
}
```

### Worker Picking
| Endpoint | Method | Development Status |
|---|---|:---:|
| `worker/picking` | `POST` | Not Started |

All workers with a status of "picking" are returned.

#### Request

```javascript
{
  workers: {
    status: 403
  }
}
```

#### Response

```javascript
{
  workers: [
    {
      worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    },
    {
      worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }
  ]
}
```

### Worker Packaging
| Endpoint | Method | Development Status |
|---|---|:---:|
| `worker/packaging` | `POST` | Not Started |

All workers with a status of "packaging" are returned.

#### Request

```javascript
{
  workers: {
    status: 404
  }
}
```

#### Response

```javascript
{
  workers: [
    {
      worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    },
    {
      worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }
  ]
}
```

### Worker Shipping

| Enpoint | Method | Development Status |
|---|---|:---:|
| `worker/shipping` | `POST` | Not Started |

All workers with a status of "shipping" are returned.

#### Request

```javascript
{
  workers: {
    status: 405
  }
}
```

#### Response

```javascript
{
  workers: [
    {
      worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    },
    {
      worker_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
    }
  ]
}
```

## Pod Object Definitions
### Pod Find
| Endpoint | Method | Development Status |
|---|---|:---:|
| `pod/find` | `POST` | Not Started |

Returns a record of an individual Pod by pod_id.

##### Request

```javascript
{
  podId: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91'
}
```

##### Response

```javascript
{
  pods: {
    pod_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
    payload: 40,
    status: 500 - 503
  }
}
```

### Pod Available
| Endpoint | Method | Development Status |
|---|---|:---:|
| `pod/available` | `POST` | Not Started |

Returns all Pods with payload availability.

#### Request

```javascript
{
  status: 500
}
```

#### Response

```javascript
{
  pods: [
    {
      pod_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      payload: 40
    },
    {
      pod_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      payload: 25
    }
  ]
}
```
### Pod Loading
| Endpoint | Method | Development Status |
|---|---|:---:|
| `pod/loading` | `POST` | Not Started |

Returns all pods being loaded.

#### Request

```javascript
{
  status: 501
}
```

#### Response

```javascript
{
  pods: [
    {
      pod_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      payload: 40
    },
    {
      pod_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      payload: 25
    }
  ]
}
```

### Pod Picking
| Enpoint | Method | Development Status |
|---|---|:---:|
| `pod/picking` | `POST` | Not Started |

Returns all pods with a status of Picking.

#### Request

```javascript
{
  status: 502
}
```

#### Response

```javascript
{
  pods: [
    {
      pod_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      payload: 40
    },
    {
      pod_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      payload: 25
    }
  ]
}
```

### Pod Maintenance
| Endpoint | Method | Development Status |
|---|---|:---:|
| `pod/maintenance` | `POST` | Not Started |

Returns all pods with a status of Maintenance.

#### Request

```javascript
{
  status: 503
}
```

#### Response

```javascript
{
  pods: [
    {
      pod_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      payload: 40
    },
    {
      pod_id: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
      payload: 25
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
