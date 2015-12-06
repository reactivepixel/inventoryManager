# Gravity

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

###Gulp
You will need to -g install gulp. You will also need to npm install to get all the node modules.

```
gulp dev

```

Once you have this your server should run great!

## Environments
Here are links to all Environments.

### Development
Link to [Development](https://sol-gravity-development.herokuapp.com)

### Staging
Link to [Staging](https://sol-gravity-staging.herokuapp.com)

### Production
Link to [Production](https://sol-gravity-production.herokuapp.com)

