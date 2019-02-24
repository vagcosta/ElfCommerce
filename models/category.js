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

function Category(
  code,
  name,
  storeId,
  addedBy,
  level,
  parentId,
  status,
  dbConn
) {
  this.code = code;
  this.name = name;
  this.storeId = storeId;
  this.addedBy = addedBy;
  this.level = level;
  this.parentId = parentId;
  this.status = status;
  if (dbConn !== undefined) {
    this.db = dbConn;
  }
}

Category.prototype.get = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, name, store_id as storeId, level, parent_id as parentId, status from category where code='${code}'`,
      (error, results) => {

        if (error) {
          reject(new NoRecordFoundError('No category found.'));
        } else {
          const { code, name, storeId, level, parentId, status } = results[0];
          resolve(new Category(code, name, storeId, '', level, parentId, status));
        }
      }
    );
  });
};

Category.prototype.getTotalCountByStoreId = function (id, activeOnly = false) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select count(*) as total 
       from category where store_id='${id}'${activeOnly ? ' and status=1' : ''}`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No categorys found.'));
        } else {
          resolve(results[0].total);
        }
      }
    );
  });
};

Category.prototype.getAllByStoreId = function (
  id,
  page = 1,
  pageSize = 20,
  activeOnly = false) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, name, store_id as storeId, level, parent_id as parentId, status 
       from category where store_id='${id}'${activeOnly ? ' and status=1' : ''} order by parent_id, level limit ${(page -
        1) *
      pageSize}, ${pageSize}`,
      (error, results) => {

        if (error) {
          reject(new NoRecordFoundError('No categories found.'));
        } else {
          const categories = results.map(cat => {
            const { code, name, storeId, level, parentId, status } = cat;
            return new Category(code, name, storeId, '', level, parentId, status);
          });
          resolve(categories);
        }
      }
    );
  });
};

Category.prototype.add = function (category) {
  return new Promise((resolve, reject) => {
    let proceed = true;

    if (category instanceof Category) {
      Object.keys(category).forEach(function (key, index) {
        if (category[key] === undefined) {
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

      const { code, name, storeId, addedBy, parentId } = category;

      (this.db || db).query(
        `insert into category(code, name, store_id, added_by, parent_id) 
         values('${code}', '${name}', '${storeId}', '${addedBy}', ${parentId ? 2 : 1}, '${parentId ? parentId : code}')`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalid category data.'));
          } else {
            resolve(new Category(code, name, storeId, addedBy, parentId ? 2 : 1, parentId));
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalid category data.'));
    }
  });
};

Category.prototype.update = function (category) {
  return new Promise((resolve, reject) => {
    if (category instanceof Category) {
      const { code, name, storeId, addedBy, parentId } = category;

      (this.db || db).query(
        `update category set name = '${name}', level = ${parentId ? 2 : 1}, 
         parent_id = '${parentId ? parentId : code}' 
         where code = '${code}' and added_by = '${addedBy}'`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalid category data.'));
          } else {
            resolve(new Category(code, name, storeId, parentId ? 2 : 1, parentId));
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalid category data.'));
    }
  });
};

Category.prototype.delete = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(`update category set status = 0 where code = '${code}'`, error => {
      if (error) {
        reject(new BadRequestError('Archiving category failed.'));
      } else {
        resolve('Category archived.');
      }
    });
  });
};

Category.prototype.activate = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(`update category set status = 1 where code = '${code}'`, error => {
      if (error) {
        reject(new BadRequestError('Activating category failed.'));
      } else {
        resolve('Category activated.');
      }
    });
  });
};

module.exports = Category;
