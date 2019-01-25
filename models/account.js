'use strict';

const moment = require('moment');
const { MySQL } = require('../db');
const {
  BadRequestError,
  InvalidModelArgumentsError,
  NoRecordFoundError,
} = require('../exceptions');
require('dotenv').load();

const { tokenSecret, host, user, password, database } = process.env;

function Account(
  code,
  storeId,
  name,
  email,
  password,
  salt,
  joinedOn,
  status = 1,
  dbName = null
) {
  // If a field is optional then provide default empty value
  this.code = code;
  this.storeId = storeId;
  this.name = name;
  this.email = email;
  this.password = password;
  this.salt = salt;
  this.joinedOn = joinedOn || moment.utc().format('YYYY-MM-DD HH:mm:ss');
  this.status = status;
  this.db = new MySQL(host, user, password, dbName || database);
}

Account.prototype.get = function (id) {
  return new Promise((resolve, reject) => {
    this.db.query(
      `select code, store_id as storeId, name, email, joined_on as joinedOn, status
       from user
       where code='${id}'`,
      (error, results) => {
        if (error || results.length == 0) {
          reject(new NoRecordFoundError('No account found.'));
        } else {
          const {
            code,
            storeId,
            name,
            email,
            joinedOn,
            status,
          } = results[0];
          resolve(
            new Account(
              code,
              storeId,
              name,
              email,
              null,
              null,
              moment(joinedOn).format('YYYY-MM-DD HH:mm:ss'),
              status
            )
          );
        }
      }
    );
  });
};

Account.prototype.getTotalCountByStoreId = function (id) {
  return new Promise((resolve, reject) => {
    this.db.query(
      `select count(*) as total 
       from account where store_id='${id}'`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No accounts found.'));
        } else {
          resolve(results[0].total);
        }
      }
    );
  });
};

Account.prototype.getAllByStoreId = function (id, page = 1, pageSize = 20) {
  return new Promise((resolve, reject) => {
    this.db.query(
      `select code, store_id as storeId, name, email, joined_on as joinedOn, status
       from user
       where store_id='${id}' order by added_on desc limit ${(page - 1) *
      pageSize}, ${pageSize}`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No orders found.'));
        } else {
          const accounts = results.map(account => {
            const {
              code,
              storeId,
              name,
              email,
              joinedOn,
              status,
            } = account;
            return new Account(
              code,
              storeId,
              name,
              email,
              null,
              null,
              moment(joinedOn).format('YYYY-MM-DD HH:mm:ss'),
              status
            );
          });

          resolve(accounts);
        }
      }
    );
  });
};

Account.prototype.add = function (account) {
  return new Promise((resolve, reject) => {
    let proceed = true;

    if (account instanceof Account) {
      Object.keys(account).forEach(function (key, index) {
        if (account[key] === undefined) {
          reject(
            new InvalidModelArgumentsError(
              'Not all required fields have a value.'
            )
          );
          proceed = false;
        }
      });

      if (!proceed) {
        return;
      }

      const {
        code,
        storeId,
        name,
        email,
        password,
        salt,
        joinedOn,
      } = account;

      this.db.query(
        `insert into user(code, store_id, name, email, password, salt, joined_on) 
         values('${code}', '${storeId}', '${name}', '${email}','${password}', '${salt}', '${joinedOn}')`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalid account data.'));
          } else {
            resolve(
              new Account(
                code,
                storeId,
                name,
                email,
                password,
                salt,
                moment(joinedOn).format('YYYY-MM-DD HH:mm:ss'),
                true
              )
            );
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalid order data.'));
    }
  });
};

Account.prototype.update = function (account) {
  return new Promise((resolve, reject) => {
    if (account instanceof Account) {
      const {
        code,
        storeId,
        name,
        email,
      } = account;

      this.db.query(
        `update account set name='${name}', email='${email}' 
         where code='${code}'`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalid account data.'));
          } else {
            resolve(
              new Account(
                code,
                storeId,
                name,
                email,
                null,
                null,
                null,
                null
              )
            );
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalid account data.'));
    }
  });
};

Account.prototype.delete = function (code) {
  return new Promise((resolve, reject) => {
    this.db.query(
      `update account set status=0 where code='${code}'`,
      (error, results) => {

        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Deleting account failed.'));
        } else {
          resolve('Account deleted.');
        }
      }
    );
  });
};

module.exports = Account;