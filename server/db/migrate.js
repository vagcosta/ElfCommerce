const fs = require('fs');
const mysql = require('mysql');
require('dotenv').load();

const { dbHost, dbUser, dbPassword, dbName } = process.env;

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  multipleStatements: true,
});

const sql = fs.readFileSync(`${__dirname}/db.sql`, 'utf8');

db.query(sql, (err, results) => {
  if(err){
    // eslint-disable-next-line no-console
    console.log(err);
  }else{
    // eslint-disable-next-line no-console
    console.log(results);
  }
  process.exit();
});


