'use strict';

const moment = require('moment');
const md5 = require('md5');
const { MySQL } = require('../db');
const {
  BadRequestError,
  InvalidModelArgumentsError,
  NoRecordFoundError,
} = require('../exceptions');
require('dotenv').load();

const { dbHost, dbUser, dbPassword, dbName } = process.env;
const db = new MySQL(dbHost, dbUser, dbPassword, dbName);

function Account(
  code,
  storeId,
  name,
  email,
  password,
  salt,
  joinedOn,
  role,
  status,
  dbConn
) {
  // If a field is optional then provide default empty value
  this.code = code;
  this.storeId = storeId;
  this.name = name;
  this.email = email;
  this.password = password;
  this.salt = salt;
  this.joinedOn = joinedOn || moment.utc().format('YYYY-MM-DD HH:mm:ss');
  this.role = role;
  this.status = status;
  if (dbConn !== undefined) {
    this.db = dbConn;
  }
}

Account.prototype.get = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, store_id as storeId, name, email, joined_on as joinedOn, role, status
       from user
       where code='${code}'`,
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
            role,
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
              role,
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
    (this.db || db).query(
      `select count(*) as total 
       from user where store_id='${id}'`,
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
    (this.db || db).query(
      `select code, store_id as storeId, name, email, joined_on as joinedOn, role, status
       from user
       where store_id='${id}' order by joined_on desc limit ${(page - 1) *
      pageSize}, ${pageSize}`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No accounts found.'));
        } else {
          const accounts = results.map(account => {
            const {
              code,
              storeId,
              name,
              email,
              joinedOn,
              role,
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
              role,
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
        role,
      } = account;

      (this.db || db).query(
        `insert into user(code, store_id, name, email, password, salt, joined_on, role) 
         values('${code}', '${storeId}', '${name}', '${email}','${md5(password + salt)}', '${salt}', '${joinedOn}', ${role})`,
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
                role,
                true
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

Account.prototype.update = function (account) {
  return new Promise((resolve, reject) => {
    if (account instanceof Account) {
      const {
        code,
        storeId,
        name,
        email,
        password,
        salt,
        role,
      } = account;

      (this.db || db).query(
        password ? `update user set password='${md5(password + salt)}', salt='${salt}' 
        where code='${code}'` :
          `update user set name='${name}', role=${role}
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
                role,
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
    (this.db || db).query(
      `update user set status=0 where code='${code}'`,
      (error, results) => {

        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Deactivating account failed.'));
        } else {
          resolve('Account deactivated.');
        }
      }
    );
  });
};

Account.prototype.activate = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update user set status=1 where code='${code}'`,
      (error, results) => {

        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Activating account failed.'));
        } else {
          resolve('Account activated.');
        }
      }
    );
  });
};

module.exports = Account;