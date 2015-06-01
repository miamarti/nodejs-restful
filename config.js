var Host = require('./application/defaultHost')({
	host: 'localhost',
	port: '27017',
	database: 'test'
});

/*
 * cURL Token Authentication
 * $ curl 'http://localhost:3003/auth'
 * -X POST
 * -H 'Content-Type: application/json'
 * --data-binary '{"_token":"7e97189b91ec52a6274943c3277f57ac"}'
 */
exports.token = '7e97189b91ec52a6274943c3277f57ac';

/*
 * Application Domains
 */
exports.domains = [
    new Host('financial'),
    new Host('reception'),
    new Host('customer')
];
