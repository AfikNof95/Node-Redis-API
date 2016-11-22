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