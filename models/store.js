'use strict';

const moment = require('moment');
const { MySQL } = require('../db');
const {
  BadRequestError,
  InvalidModelArgumentsError,
  NoRecordFoundError,
} = require('../exceptions');
require('dotenv').load();

const { dbHost, dbUser, dbPassword, dbName } = process.env;
const db = new MySQL(dbHost, dbUser, dbPassword, dbName);

function StoreSummary(
  orderSummary,
  productSummary,
  shippingSummary,
  dbConn
) {
  this.orderSummary = orderSummary || null;
  this.productSummary = productSummary || null;
  this.shippingSummary = shippingSummary || null;
  if (dbConn !== undefined) {
    this.db = dbConn;
  }
}

StoreSummary.prototype.get = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select count(*) as total, status
       from \`order\` 
       where store_id='${code}'
       group by status`,
      (error, orderSummary) => {
        if (error) {
          reject(new NoRecordFoundError('No store summary found.'));
        } else {
          (this.db || db).query(
            `select count(*) as total, status
             from product 
             where store_id='${code}'
             group by status`,
            (error, productSummary) => {
              if (error) {
                reject(new NoRecordFoundError('No store summary found.'));
              } else {
                resolve(
                  new StoreSummary(
                    orderSummary,
                    productSummary,
                  )
                );
              }
            }
          );
        }
      }
    );
  });
};

function Store(
  code,
  name,
  description,
  logo,
  countryId,
  language,
  currencyId,
  createdBy,
  facebook,
  twitter,
  dbConn
) {
  this.code = code;
  this.name = name;
  this.description = description || '';
  this.logo = logo || '';
  this.countryId = countryId;
  this.language = language;
  this.currencyId = currencyId;
  this.createdBy = createdBy;
  this.facebook = facebook || '';
  this.twitter = twitter || '';
  if (dbConn !== undefined) {
    this.db = dbConn;
  }
}

Store.prototype.get = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select name, code, description, logo, country_id as countryId, language, currency_id as currencyId, facebook, twitter 
       from store where code='${code}' and status=1`,
      (error, results) => {
        if (error || results.length == 0) {
          reject(new NoRecordFoundError('No store found.'));
        } else {
          const {
            name,
            code,
            description,
            logo,
            countryId,
            language,
            currencyId,
            facebook,
            twitter,
          } = results[0];
          resolve(
            new Store(
              code,
              name,
              description,
              logo,
              countryId,
              language,
              currencyId,
              '',
              facebook,
              twitter
            )
          );
        }
      }
    );
  });
};

Store.prototype.add = function (store) {
  return new Promise((resolve, reject) => {
    let proceed = true;

    if (store instanceof Store) {
      Object.keys(store).forEach(function (key, index) {
        if (store[key] === undefined) {
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
        description,
        logo,
        countryId,
        language,
        currencyId,
        createdBy,
        facebook,
        twitter,
      } = store;

      (this.db || db).query(
        `insert into store(name, code, description, created_on, created_by, logo, country_id, language, currency_id, facebook, twitter) 
         values('${name}', '${code}', '${description}', '${moment
          .utc()
          .format(
            'YYYY-MM-DD HH:mm:ss'
          )}', '${createdBy}', '${logo}', ${countryId}, '${language}', ${currencyId}, '${facebook}', '${twitter}')`,
        (error, results) => {

          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalide store data.'));
          } else {
            resolve(
              new Store(
                code,
                name,
                description,
                logo,
                countryId,
                language,
                currencyId,
                createdBy,
                facebook,
                twitter
              )
            );
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalide store data.'));
    }
  });
};

Store.prototype.update = function (store) {
  return new Promise((resolve, reject) => {
    if (store instanceof Store) {
      const {
        code,
        name,
        description,
        logo,
        countryId,
        language,
        currencyId,
        createdBy,
        facebook,
        twitter,
      } = store;

      (this.db || db).query(
        `update store set name='${name}', logo='${logo}', description='${description}', currency_id='${currencyId}', 
         language='${language}', country_id=${countryId}, facebook='${facebook}', twitter='${twitter}'
         where code='${code}' and created_by='${createdBy}'`,
        (error, results) => {

          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalide store data.'));
          } else {
            resolve(
              new Store(
                code,
                name,
                description,
                logo,
                countryId,
                language,
                currencyId,
                createdBy,
                facebook,
                twitter
              )
            );
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalide store data.'));
    }
  });
};

Store.prototype.delete = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update store set status=0 where code=${code}`,
      (error, results) => {

        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Deleting store failed.'));
        } else {
          resolve('Store deleted.');
        }
      }
    );
  });
};

module.exports = {
  Store,
  StoreSummary,
};
