var config = require('../config'),
    express = require('express'),
    http = require('http'),
    app = express();

require("./core")(app, config);
http.createServer(app).listen(3003);
