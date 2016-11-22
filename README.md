# Node-Redis-API
Generic Node Redis API

##Configuration
'''javascript
var config = module.exports = {

    appConfig: {
        port: '1234',
        'getAllURL': '/getData/:ID',
        'getURL': '/getData/:ID/:fieldName',
        'postURL': '/setData/:ID',
        'deleteURL': '/deleteData/:ID/:fieldName'
    },
    redisConfig: {host: 'localhost', port: '6379'}
};

The port, redis server host and port , the routing are configurable.
$appConfig
port- The port the application will run on.
