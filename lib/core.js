module.exports = function(app, config) {

    var mongo = require('mongodb'),
        fs = require('fs'),
        Server = mongo.Server,
        Db = mongo.Db;
        ObjectID = require('mongodb').ObjectID;

    config.domains.forEach(function(domain){
        var server = new Server(domain.db.host, domain.db.port, {
            auto_reconnect: true
        });
        var db = new Db(domain.db.database, server, {
            safe: true
        });
        var utils = require('./utils')(app, db, domain);
        db.open(function(err, db) {
            if (!err){
                console.log('============================================================================');
                console.log('The ' + domain.restRoot  + ' domain was instantiated:');
                console.log('Connected to database:' + domain.db.database + "." + domain.db.entityCollection);
                console.log('-->> http://localhost:3003/' + domain.db.entityCollection + ((domain.token !== undefined)?('?_token=' + domain.token):''));
                console.log('============================================================================');
                console.log('\n');
            }
        });
        require("./route")(app, domain, utils);
    });

};
