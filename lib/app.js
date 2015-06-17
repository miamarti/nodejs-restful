module.exports = function(){

	this.defaulHost = function(config){
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

	this.start = function(config, port){
		var express = require('express'),
		    http = require('http'),
		    app = express(),
		    session = require('express-session');

		    app.post('/auth', require('body-parser').json(), function(req, res){
			if(req.body._token === config.rootToken){
			    res.json({auth: true});
			} else {
			    res.json({auth: false});
			}
		    });

		require("./core")(app, config, port);
		http.createServer(app).listen(port);
	};
};
