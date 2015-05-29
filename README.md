# nodejs-restful
Restful web services - MongoDB
--
GET
`curl -X GET 'http://localhost:3003/{collection}'
--
GET List
`curl -X GET 'http://localhost:3003/{collection}/{id}'`
--
POST
`curl -X POST 'http://localhost:3003/{collection}' -H 'Content-Type: application/json' --data-binary '{"name":"xxxxx"}'`

--
DELETE

`curl -X DELETE 'http://localhost:3003/{collection}/{id}'`
--
