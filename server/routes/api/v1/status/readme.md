# Status Codes
| Status Code   | General Meaning | Reason                                  |
| ------------- | --------------  | --------------------------------------- |
| 100           | Picking         | Usually means 'continue' or 'processing'|
| 200           | Shipped         | Usually a 'success' message             |
| 300           | Packing         | Usually means a 'redirect'              |
| 400           | Not Found       | Usually an 'error'                      |
| 500           | Unavailable     | Usually a 'bad request'                 |
| 600           | Shipping        |                                         |
| 700           | Inspecting      |                                         |
| 800           | Incomplete      |                                         |
| 900           | Retired         | After it is out of our hands            |

* *This list can be changed, this is not set in stone. If you find that a status code would suit a different reason, let me know so that the proper changes can be made. The assigned status code decisions were made based on http status codes and somewhat an order in which they go through in the warehouse.*
