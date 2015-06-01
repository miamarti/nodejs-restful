module.exports = function(config){
	return function(entityCollection, token){
		this.restRoot = '/' + entityCollection;
		this.db = {
			host: config.host,
			port: config.port,
			database: config.database,
			entityCollection: entityCollection
		};
		this.authenticateMethod = require('body-parser').json();
		this.ObjectID = require('mongodb').ObjectID;
        this.token = token;
	};
};
