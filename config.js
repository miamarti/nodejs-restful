var Host = require('./application/defaultHost')({
	host: 'localhost',
	port: '27017',
	database: 'test'
});

/*
 * Application Domains
 */
exports.domains = [
    new Host('financial', '7e97189b91ec52a6274943c3277f57ac'), //_token
    new Host('reception'),
    new Host('customer')
];
