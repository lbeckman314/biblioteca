var mysql = require('mysql');

var pool = mysql.createConnection({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'cs340_beckmanl',
  password        : '0734',
  database        : 'cs340_beckmanl',
    multipleStatements: true
});

module.exports.pool = pool;
