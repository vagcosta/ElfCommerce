'use strict';

const { MySQL } = require('../db');
const {
  BadRequestError,
  NoRecordFoundError,
} = require('../exceptions');
require('dotenv').load();

const { host, user, password, database } = process.env;

function Public(dbName = null) {
  this.db = new MySQL(host, user, password, dbName || database);
}

Public.prototype.getCountries = function () {
  return new Promise((resolve, reject) => {
    this.db.query(
      'select id, name, flag, tel_code as telCode from country',
      (error, results) => {

        if (error || results.length == 0) {
          reject(new NoRecordFoundError('No countries found.'));
        } else {
          resolve(results);
        }
      }
    );
  });
};

Public.prototype.getCurrencies = function () {
  return new Promise((resolve, reject) => {
    this.db.query('select * from currency', (error, results) => {

      if (error || results.length == 0) {
        reject(new NoRecordFoundError('No currencies found.'));
      } else {
        resolve(results);
      }
    });
  });
};

Public.prototype.delete = function (code) {
  return new Promise((resolve, reject) => {
    this.db.query(
      `update product set status=0 where code=${code}`,
      (error, results) => {

        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Deleting product failed.'));
        } else {
          resolve('Product deleted.');
        }
      }
    );
  });
};

module.exports = Public;
