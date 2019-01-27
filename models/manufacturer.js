'use strict';

const { MySQL } = require('../db');
const {
  BadRequestError,
  InvalidModelArgumentsError,
  NoRecordFoundError,
} = require('../exceptions');
require('dotenv').load();

const { host, user, password, database } = process.env;

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
  status = 1,
  dbName = null
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
  this.db = new MySQL(host, user, password, dbName || database);
}

Manufacturer.prototype.get = function (code) {
  return new Promise((resolve, reject) => {
    this.db.query(
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

Manufacturer.prototype.getTotalCountByStoreId = function (id) {
  return new Promise((resolve, reject) => {
    this.db.query(
      `select count(*) as total 
       from manufacturer where store_id='${id}'`,
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
  pageSize = 20
) {
  return new Promise((resolve, reject) => {
    this.db.query(
      `select code, name, url, email, contact, address, logo, store_id as storeId, country_id as countryId, added_by as addedBy, status
       from manufacturer where store_id='${id}' order by name limit ${(page - 1) *
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

      this.db.query(
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

      this.db.query(
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
    this.db.query(
      `update manufacturer set status=0 where code='${code}'`,
      (error, results) => {

        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Deleting manufacturer failed.'));
        } else {
          resolve('Manufacturer deleted.');
        }
      }
    );
  });
};

module.exports = Manufacturer;
