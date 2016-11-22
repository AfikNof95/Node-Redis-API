# Node-Redis-API
Generic Node Redis API

## Configuration

```javascript
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
```

The port, redis server host and port , the routing are configurable.
**$appConfig**
port- The port the application will run on.
getAll/get/post/delete URL - the routing for the http methods

 **redisConfig**
 host - The server redis is running on (localhost by default).
 port: The port redis-server is listening to (6379 by default).

 ##Router

 ```javascript
 var express = require('express');
 var appConfig = require('../config').appConfig;
 var bodyParser = require('body-parser');
 var router = express.Router();
 var redisHandler = require('../models/redisHandler');

 router.use(bodyParser.json());
 router.use(bodyParser.urlencoded({extended: false}));


 router.get(appConfig.getURL, redisHandler.getDataByFieldName); //'/getData/:ID/:fieldName'

 router.get(appConfig.getAllURL, redisHandler.getAllData);      //'/getAllData/:ID'

 router.post(appConfig.postURL, redisHandler.setData);          //'/setData/:ID'

 router.delete(appConfig.deleteURL, redisHandler.deleteData);   //'/deleteData/:ID'


 module.exports = router;
 ```

 The router is the app main controller, it includes the app's routing (info is up).

 Http methods structure:

 **'/getData/:ID/:fieldName'** - the app is listening to http://$Your_Host/api/getData/:ID/:fieldName - example - http://localhost:1234/api/getData/foo/firstName - will return the firstName of foo.

**'/getAllData/:ID'** - the app is listening to http://$Your_Host/api/getAllData/:ID - example - http://localhost:1234/api/getAllData/foo - will return every field the foo object has and its value.

 **'/setData/:ID'** - the app is listening to http://$Your_Host/api/setData/:ID - example - http://localhost:1234/api/setData/foo - The API expect to get a json {firstName:bla,lastName:bloo} for example the server will parse the json and add the fields to foo's data on the redis db.

 **'/deleteData/:ID/:fieldName'** - the app is listening to http://$Your_Host/api/getData/:ID/:fieldName - example - http://localhost:1234/api/deleteData/foo/firstName - will delete foo's first name from the redis db.


 ##Redis

 you can download redis for windows from here:
 [Redis For Windows](https://github.com/rgl/redis/downloads)
 The dataset used in this project is hash.
