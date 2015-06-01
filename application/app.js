var config = require('../config'),
    express = require('express'),
    http = require('http'),
    app = express(),
    session = require('express-session');

    app.post('/auth', require('body-parser').json(), function(req, res){
        if(req.body._token === config.token){
            require("./core")(app, config);
            res.json({auth: true});
        } else {
            res.json({auth: false});
        }
    });

http.createServer(app).listen(3003);

console.log('Your application is running !!!\nPlease performs authentication by sending the token as cURL below:\n$ curl \'http://localhost:3003/auth\' -X POST -H \'Content-Type: application/json\' --data-binary \'{"_token":"7e97189b91ec52a6274943c3277f57ac"}\'\n\n');
