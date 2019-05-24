'user strict';

const mysql = require('mysql');

function MySQL(host, user, password, database) {
  return mysql.createPool({
    connectionLimit: 20,
    host,
    user,
    password,
    database,
  });
}

module.exports = MySQL;
