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

function Manufacturer(
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

Manufacturer.prototype.get = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, name, url, email, contact, address, logo, store_id as storeId, country_id as countryId, added_by as addedBy, status
       from manufacturer where code='${code}'`,
      (error, results) => {

        if (error || results.length == 0) {
          reject(new NoRecordFoundError('No manufacturer found.'));
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
            new Manufacturer(
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

Manufacturer.prototype.getTotalCountByStoreId = function (
  id,
  activeOnly = false
) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select count(*) as total 
       from manufacturer where store_id='${id}'${activeOnly ? ' and status=1' : ''}`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No manufacturers found.'));
        } else {
          resolve(results[0].total);
        }
      }
    );
  });
};

Manufacturer.prototype.getAllByStoreId = function (
  id,
  page = 1,
  pageSize = 20,
  activeOnly = false
) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, name, url, email, contact, address, logo, store_id as storeId, country_id as countryId, added_by as addedBy, status
       from manufacturer where store_id='${id}'${activeOnly ? ' and status=1' : ''} order by name limit ${(page - 1) *
      pageSize}, ${pageSize}`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No manufacturers found.'));
        } else {
          const manufacturers = results.map(supplier => {
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
            return new Manufacturer(
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

          resolve(manufacturers);
        }
      }
    );
  });
};

Manufacturer.prototype.add = function (manufacturer) {
  return new Promise((resolve, reject) => {
    let proceed = true;

    if (manufacturer instanceof Manufacturer) {
      Object.keys(manufacturer).forEach(function (key, index) {
        if (manufacturer[key] === undefined) {
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
      } = manufacturer;

      (this.db || db).query(
        `insert into manufacturer(code, name, url, email, contact, address, logo, store_id, country_id, added_by) 
         values('${code}', '${name}', '${url}', '${email}', '${contact}', '${address}', '${logo}', '${storeId}', '${countryId}', '${addedBy}')`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalide manufacturer data.'));
          } else {
            resolve(
              new Manufacturer(
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
      reject(new BadRequestError('Invalide manufacturer data.'));
    }
  });
};

Manufacturer.prototype.update = function (manufacturer) {
  return new Promise((resolve, reject) => {
    if (manufacturer instanceof Manufacturer) {
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
      } = manufacturer;

      (this.db || db).query(
        `update manufacturer set name='${name}', url='${url}', email='${email}', contact='${contact}', 
         address='${address}', logo='${logo}', country_id='${countryId}'
         where code='${code}' and added_by='${addedBy}'`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalide manufacturer data.'));
          } else {
            resolve(
              new Manufacturer(
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
      reject(new BadRequestError('Invalide manufacturer data.'));
    }
  });
};

Manufacturer.prototype.delete = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update manufacturer set status=0 where code='${code}'`,
      (error, results) => {
        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Archiving manufacturer failed.'));
        } else {
          resolve('Manufacturer archived.');
        }
      }
    );
  });
};

Manufacturer.prototype.activate = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update manufacturer set status=1 where code='${code}'`,
      (error, results) => {

        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Activating manufacturer failed.'));
        } else {
          resolve('Manufacturer activated.');
        }
      }
    );
  });
};


module.exports = Manufacturer;
