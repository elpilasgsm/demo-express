var mysqlConfig = require('./mysql.conf.json');
var datasource = require('mysql');

var getConnection = function () {
    return datasource.createConnection(mysqlConfig);
};

var closeConnection = function (connection) {
    if (connection) {
        connection.end();
    }
};

var getAllPersions = function (callback) {
    var connection = getConnection();
    connection.connect();
    connection.query("SELECT FIRST_NAME as firstName, LAST_NAME as lastName FROM PERSON", function (err, rows, fields) {
        if (err) {
            console.log(err)
        } else if (rows) {
            callback(rows);
        }
    });
    closeConnection(connection);
};

module.exports.getAllPersions = getAllPersions;