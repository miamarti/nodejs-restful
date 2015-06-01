var config = require('../config'),
    express = require('express'),
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

require("./core")(app, config);
http.createServer(app).listen(3003);