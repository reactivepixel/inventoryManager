# Gravity

Business backend logic for Sol

## Local Dev Installation

... Add instructions here ...

## API Documentation

### Order
#### Create

| Endpoint | Method | Development Status |
|---|---|:---:|
| `/order` | `PUT` | In Progress |

##### Request

 ```javascript
 {
   order: {
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
 }
 ```

##### Response

 ```javascript
 {
   order: {
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
 }
 ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
