'use strict';

const { MySQL } = require('../db');
const {
  BadRequestError,
  InvalidModelArgumentsError,
  NoRecordFoundError,
} = require('../exceptions');
require('dotenv').load();

const { dbHost, dbUser, dbPassword, dbName } = process.env;
const db = new MySQL(dbHost, dbUser, dbPassword, dbName);

function Supplier(
  code,
  name,
  url,
  email,
  contact,
  address,
  logo,
  storeId,
  countryId,
  addedBy,
  status,
  dbConn
) {
  this.code = code;
  this.name = name;
  this.url = url || '';
  this.email = email || '';
  this.contact = contact;
  this.address = address;
  this.logo = logo || '';
  this.storeId = storeId;
  this.countryId = countryId;
  this.addedBy = addedBy;
  this.status = status;
  if (dbConn !== undefined) {
    this.db = dbConn;
  }
}

Supplier.prototype.get = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, name, url, email, contact, address, logo, store_id as storeId, country_id as countryId, added_by as addedBy, status
       from supplier where code='${code}'`,
      (error, results) => {
        if (error || results.length == 0) {
          reject(new NoRecordFoundError('No supplier found.'));
        } else {
          const {
            code,
            name,
            url,
            email,
            contact,
            address,
            logo,
            storeId,
            countryId,
            addedBy,
            status,
          } = results[0];
          resolve(
            new Supplier(
              code,
              name,
              url,
              email,
              contact,
              address,
              logo,
              storeId,
              countryId,
              addedBy,
              status
            )
          );
        }
      }
    );
  });
};

Supplier.prototype.getTotalCountByStoreId = function (
  id,
  activeOnly = false
) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select count(*) as total 
       from supplier where store_id='${id}'${activeOnly ? ' and status=1' : ''}`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No suppliers found.'));
        } else {
          resolve(results[0].total);
        }
      }
    );
  });
};

Supplier.prototype.getAllByStoreId = function (
  id,
  page = 1,
  pageSize = 20,
  activeOnly = false
) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, name, url, email, contact, address, logo, store_id as storeId, country_id as countryId, added_by as addedBy, status
       from supplier where store_id='${id}'${activeOnly ? ' and status=1' : ''} order by name limit ${(page - 1) *
      pageSize}, ${pageSize}`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No suppliers found.'));
        } else {
          const suppliers = results.map(supplier => {
            const {
              code,
              name,
              url,
              email,
              contact,
              address,
              logo,
              storeId,
              countryId,
              addedBy,
              status,
            } = supplier;
            return new Supplier(
              code,
              name,
              url,
              email,
              contact,
              address,
              logo,
              storeId,
              countryId,
              addedBy,
              status
            );
          });

          resolve(suppliers);
        }
      }
    );
  });
};

Supplier.prototype.add = function (supplier) {
  return new Promise((resolve, reject) => {
    let proceed = true;

    if (supplier instanceof Supplier) {
      Object.keys(supplier).forEach(function (key, index) {
        if (supplier[key] === undefined) {
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
        name,
        url,
        email,
        contact,
        address,
        logo,
        storeId,
        countryId,
        addedBy,
      } = supplier;

      (this.db || db).query(
        `insert into supplier(code, name, url, email, contact, address, logo, store_id, country_id, added_by) 
         values('${code}', '${name}', '${url}', '${email}', '${contact}', '${address}', '${logo || ''}', 
         '${storeId}', '${countryId}', '${addedBy}')`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalide supplier data.'));
          } else {
            resolve(
              new Supplier(
                code,
                name,
                url,
                email,
                contact,
                address,
                logo,
                storeId,
                countryId,
                addedBy
              )
            );
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalide supplier data.'));
    }
  });
};

Supplier.prototype.update = function (supplier) {
  return new Promise((resolve, reject) => {
    if (supplier instanceof Supplier) {
      const {
        code,
        name,
        url,
        email,
        contact,
        address,
        logo,
        storeId,
        countryId,
        addedBy,
      } = supplier;

      let sql = `update supplier set name='${name}', url='${url}', email='${email}', contact='${contact}',
                 address='${address}', country_id=${countryId}`;

      if (logo) {
        sql += ` ,logo='${logo}'`;
      }

      sql += ` where code='${code}' and added_by='${addedBy}'`;

      (this.db || db).query(sql, (error, results) => {
        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Invalide supplier data.'));
        } else {
          resolve(
            new Supplier(
              code,
              name,
              url,
              email,
              contact,
              address,
              logo,
              storeId,
              countryId,
              addedBy
            )
          );
        }
      }
      );
    } else {
      reject(new BadRequestError('Invalide supplier data.'));
    }
  });
};

Supplier.prototype.delete = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update supplier set status = 0 where code = '${code}'`,
      (error, results) => {
        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Archiving supplier failed.'));
        } else {
          resolve('Supplier archived.');
        }
      }
    );
  });
};

Supplier.prototype.activate = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update supplier set status = 1 where code = '${code}'`,
      (error, results) => {
        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Activating supplier failed.'));
        } else {
          resolve('Supplier activated.');
        }
      }
    );
  });
};

module.exports = Supplier;
