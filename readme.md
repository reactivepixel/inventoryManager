# Gravity

Business backend logic for Sol

## Installation

TODO: Describe the installation process

## Endpoints

### Orders

#### Create

Create a new order

| Endpoint | Method |
|---|---|
| `orders/create` | `POST` |

##### Request

 ```javascript
 {
   orders: {
     sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
     quantity: 1,
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
 }
 ```

##### Response

 ```javascript
 {
   orders: {
     uuid: 'assigned id',
     sku: 'a5296ab9-9eee-7ba0-0a79-b801594f2c91',
     quantity: 1,
     recipients: {
       name: 'John Doe',
       address:{
         street: '3300 University Blvd',
         city: 'Winter Park',
         state: 'FL',
         zip: '32792'
       },
       email: 'jdoe@gmail.com'
     }
   }
 }
 ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
jjjkj