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

{"orderId" : "j1f4f2a2aa2a92637a2629c9ff2fe083a"}

### API Create Documentation 
How to create an order in the database
run server, npm server.js in gravity directory 

make a post request to this url: 
http://localhost:3000/api/v1/order/create
pass a JSON object in this structure:

{
  "order": {
    "recipient": {
  	  "name": "Jazy Jasilo",
  	  "address": "3300 University Blvd, Winter Park, FL 32792",
  	  "email": "orange@fullsail.edu",
  	  "phone": "555-555-5555"
    },
    "units": \[{
      "unitId": "a5296ab9-9eee-7ba0-0a79-b801594f2c91",
  	  "quantity": 4
    }\]
  }
}



