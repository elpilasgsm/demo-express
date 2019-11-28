var mysqlConfig = require('./mysql.conf.json');
var datasource = require('mysql');
const PERSON_SELECT_TERM = "SELECT PERSON_ID as id, FIRST_NAME as firstName, LAST_NAME as lastName, DATE_OF_BIRTH as birthData, DATE_OF_DEATH as deathDate FROM PERSON";
const PERSON_INSERT_TERM = "INSERT INTO PERSON (FIRST_NAME,LAST_NAME,DATE_OF_BIRTH, DATE_OF_DEATH) VALUES (?)";
var getConnection = function () {
    return datasource.createConnection(mysqlConfig);
};

var closeConnection = function (connection) {
    if (connection) {
        connection.end();
    }
};

var getAllPersons = function (callback) {
    var connection = getConnection();
    connection.connect();
    connection.query(PERSON_SELECT_TERM + " ORDER BY LAST_NAME ASC", function (err, rows, fields) {
        if (err) {
            console.log(err)
        } else if (rows) {
            callback(rows);
        }
    });
    closeConnection(connection);
};

var search = function (term, callback) {
    if (!term) {
        getAllPersons(callback);
        return;
    }
    var connection = getConnection();
    connection.connect();
    var sql = PERSON_SELECT_TERM + " WHERE FIRST_NAME LIKE ('" + term + "%') OR LAST_NAME LIKE ('" + term + "%')";
    console.log(sql)
    connection.query(PERSON_SELECT_TERM + " WHERE FIRST_NAME LIKE ('" + term + "%') OR LAST_NAME LIKE ('" + term + "%');", function (err, rows, fields) {
        if (err) {
            console.log(err)
        } else if (rows) {
            callback(rows);
        }
    });
    closeConnection(connection);
};

var create = function (data, callback) {
    var connection = getConnection();
    connection.connect();
    var variables = [[data.firstName, data.lastName, data.birthData, data.deathDate]];
    connection.query(PERSON_INSERT_TERM, variables, function (err, rows, fields) {
        if (err) {
            console.log(err)
            callback(rows);
        } else if (rows) {
            console.log(rows);
            callback(rows);
        }
    });
    closeConnection(connection);
};

var getPerson = function (id, callback) {
    if (!id) {
        callback(null);
        return;
    }
    var connection = getConnection();
    connection.connect();
    connection.query(PERSON_SELECT_TERM + " WHERE PERSON_ID = ?", [id], function (err, rows, fields) {
        if (err) {
            console.log(err);
            callback(rows);
        } else if (rows) {
            console.log(rows);
            callback(rows);
        }
    });
    closeConnection(connection);
};

var deletePerson = function (id, callback) {
    if (!id) {
        callback(null);
        return;
    }
    var connection = getConnection();
    connection.connect();
    connection.query("DELETE FROM PERSON WHERE PERSON_ID = ?", [id], function (err, rows, fields) {
        if (err) {
            console.log(err);
            callback(rows);
        } else if (rows) {
            console.log(rows);
            callback(rows);
        }
    });
    closeConnection(connection);
};

module.exports.getAllPersons = getAllPersons;
module.exports.search = search;
module.exports.create = create;
module.exports.deletePerson = deletePerson;
module.exports.getPerson = getPerson;