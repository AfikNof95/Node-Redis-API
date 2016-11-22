var redisConfig = require('../config').redisConfig;
var redis = require('redis');
var q = require('q');
var redisClient = redis.createClient({host: redisConfig.host, port: redisConfig.port});

var redisHandler = module.exports = {
    getAllData: function (req, res) {
        redisClient.hgetall(req.params.ID, function (err, reply) {
            if (err) res.status(500).send(err.message);
            if (reply)
                res.send(reply);
            else
                res.send(req.params.ID + " doesn't exist");

        });
    },
    getDataByFieldName: function (req, res) {
        redisClient.hget(req.params.ID, req.params.fieldName, function (err, reply) {
            if (err) res.status(500).send(err.message);
            if (reply)
                res.send(reply);
            else
                res.send(req.params.ID + "." + req.params.fieldName + " doesn't exist");

        })
    },
    setData: function (req, res) {
        jsonHashParser(req.params.ID, req.body).then(function (result) {
            res.send(result);
        });
    },
    deleteData: function (req, res) {
        redisClient.hdel(req.params.ID, req.params.fieldName, function (err, reply) {
            if (err)
                res.status(500).send(err);
            else {
                if (reply)
                    res.send(req.params.ID + "." + req.params.fieldName + " deleted successfully");
                else
                    res.send(req.params.ID + "." + req.params.fieldName + " doesn't exist");
            }
        });
    }
};

function jsonHashParser(id, json) {
    var result = [];
    for (var key in json) {
        redisClient.hset(id, key, json[key], function (err, reply) {
            if (err)
                result[key] = err;
            result[key] = key + " added successfully";
        })
    }
    return q.all(result);
}
