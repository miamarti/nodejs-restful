var Host = require('./application/defaultHost')({
	host: 'localhost',
	port: '27017',
	database: 'test'
});

exports.domains = [
    new Host('financial'),
    new Host('reception'),
    new Host('customer')
];
