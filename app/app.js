var express = require('express');
var config = require('./config');
var router = require('./controllers/router');
var app = express();

app.use('/api', router);


app.listen(config.appConfig.port, function () {
    console.log('Listening');
});