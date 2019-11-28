var dataSource = require('../datasource');
var express = require('express');
var router = express.Router();
var moment = require('moment');

router.get('/users/search', function (req, res, next) {
    dataSource.search(req.query.term, function (rows) {
        res.json({
            persons: rows
        });
    });
});

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

router.delete('/users/:personId', function (req, res, next) {
    dataSource.deletePerson(req.params.personId, function (rows) {
        res.json({
            status: "OK"
        });
    });
});

router.get('/users/:personId', function (req, res, next) {
    dataSource.getPerson(req.params.personId, function (rows) {
        res.json({
            person: rows ? rows[0] : {}
        });
    });
});

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

router.get('/users/generate', function (req, res, next) {
    var num = parseInt(req.query.num);
    for (var i = 0; i < num; i++) {
        dataSource.create({
            firstName: randomString(8),
            lastName: randomString(8),
            birthData: moment(Date.now()).format('YYYY-MM-DD'),
            deathDate: moment(Date.now()).format('YYYY-MM-DD')
        }, function (rows) {
            console.log(rows)
        });
    }

});
module.exports = router;
