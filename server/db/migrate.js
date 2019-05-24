const fs = require('fs');
const mysql = require('mysql');
require('dotenv').load();

const { host, user, password, database } = process.env;
var db = mysql.createConnection({
  host,
  user,
  password,
  database,
  multipleStatements: true,
});

const sql = fs.readFileSync(`${__dirname}/db.sql`, 'utf8');

db.query(sql, (err, results) => {
  if(err){
    console.log(err);
  }else{
    console.log(results);
  }
  process.exit();
});


