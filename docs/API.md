GET /
  Returned: message
GET /ping
  Returned: message

GET /nginx/test
  Returned: data
GET /nginx/dump
  Returned: data
GET /nginx/reload
  Returned: data
GET /nginx/stop
  Returned: data
GET /nginx/get
  Returned: data
PUT /nginx/create
  Provide: name, content
  Returned: message
DELETE /nginx/remove
  Provide: name
  Returned: message
GET /nginx/read/:name
  Provide: name
  Returned: data
PATCH /nginx/update
  Provide: name, content
  Returned: message
PATCH /nginx/toggle
  Provide: name
  Returned: message
