var dataSource = require('../datasource');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    dataSource.getAllPersions(function (rows) {
        var data = [];
        rows.forEach(function (val) {
            data.push({firstName: val.firstName, lastName: val.lastName})
        });
        res.render('users', {
            persons: data
        });
    });
});
module.exports = router;
