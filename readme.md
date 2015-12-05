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
| Event | Definition |
|---|---|
| [Order Create](#Order-Create) | Add an new order to the Database|
| [Order Find](#Order-Find) | Find an Order by Supplied ID|

### Order Create
| Type | Definition |
|---|---|
| Endpoint | ```order/create``` |
| Method | ```POST``` |

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
| Type | Definition |
|---|---|
| Endpoint | ```order/find``` |
| Method | ```POST``` |

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
