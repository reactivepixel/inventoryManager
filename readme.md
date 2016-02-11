<snippet>
  <content><![CDATA[
  ## Order Object Definitions
  ### Order Create
  | Endpoint | Method | Development Status |
  |---|---|:---:|
  | `order/create` | `POST` | Not Started |

  Create a new order

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
  ```]]></content>
  <tabTrigger>readme</tabTrigger>
</snippet>
