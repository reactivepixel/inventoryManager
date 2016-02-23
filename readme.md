# Gravity

Business backend logic for Sol

## Setting up

Clone the git repository to your machine using ssh.
```
$ git clone git@github.com:reactivepixel/Gravity.git
$ npm install //Installs the package.json file.
```

## Database Installation

### Installing MySQL & adding .env file

To check to see if you have MySQL installed on your machine.
```
$ mysql --verison
```

If MySQL is not installed. Install it with [Homebrew](http://brew.sh/).
```
$ brew install mysql
```

Start MySQL server.
```
$ mysql.server start //Starting MySQL server.
$ mysql -u root //Logging in as root.

//Once logged into MySQL
mysql> create database gravity;
```

Create an .env file in your root directory.
```
$ touch .env

//Add this to the .env file
DB_HOST=localhost
DB_NAME=gravity
DB_USER={local user} //Default root unless otherwise specified.
DB_PASS={local password} //Standard install is set to blank.
DB_PORT={local port running mysql} //Standard port is 3306.
```

If MySQL does not work try:
```
$ mysql.server restart
```

## API Documentation

### Order
#### Create

| Endpoint | Method | Development Status |
|---|---|:---:|
| `/order` | `PUT` | In Progress |

##### Request

 ```javascript
 {
   units: [
     {
     sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
     quantity: 1},
     {
     sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
     quantity: 1}
   ],
   recipients: {
     name: 'John Doe',
     address:{
       street: '3300 University Blvd',
       city: 'Winter Park',
       state: 'FL',
       zip: '32792'
     },
     phone: '555-555-5555',
     email: 'jdoe@gmail.com'
   }
 }
 ```

##### Response

 ```javascript
 {
   units: [
     {
     sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
     quantity: 1},
     {
     sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
     quantity: 1}
   ],
   recipients: {
     name: 'John Doe',
     address:{
       street: '3300 University Blvd',
       city: 'Winter Park',
       state: 'FL',
       zip: '32792'
     },
     phone: '555-555-5555',
     email: 'jdoe@gmail.com'
   },
   uuid: 'generated uuid',
   timestamp: '2/12/2016 2:10:25 AM'
 }
 ```

## Contributing

See [Contribute.md](https://github.com/reactivepixel/Gravity/blob/order_bot/CONTRIBUTE.md)
 for more information on how to contribute

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
