'use strict';
var express = require('express');
var appConfig = require('../config').appConfig;
var bodyParser = require('body-parser');
var router = express.Router();
var redisHandler = require('../models/redisHandler');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


router.get(appConfig.getURL, redisHandler.getDataByFieldName);

router.get(appConfig.getAllURL, redisHandler.getAllData);

router.post(appConfig.postURL, redisHandler.setData);

router.delete(appConfig.deleteURL, redisHandler.deleteData);


module.exports = router;