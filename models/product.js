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

function Product(
  code,
  name,
  categoryId,
  storeId,
  sku,
  description,
  quantity,
  allowQuantity,
  addedOn,
  addedBy,
  unitPrice,
  cost,
  coverImage,
  manufacturerId,
  supplierId,
  status,
  dbConn
) {
  // If a field is optional then provide default empty value
  this.code = code;
  this.name = name;
  this.categoryId = categoryId;
  this.storeId = storeId;
  this.sku = sku;
  this.description = description || '';
  this.quantity = quantity || 0;
  this.allowQuantity = allowQuantity;
  this.addedOn = addedOn || moment.utc().format('YYYY-MM-DD HH:mm:ss');
  this.addedBy = addedBy;
  this.unitPrice = unitPrice;
  this.cost = cost;
  this.coverImage = coverImage || '';
  this.manufacturerId = manufacturerId || '';
  this.supplierId = supplierId || '';
  this.status = status;
  if (dbConn !== undefined) {
    this.db = dbConn;
  }
}

Product.prototype.get = function (id) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, name, category_id as categoryId, store_id as storeId, sku, description, quantity, allow_quantity as allowQuantity,
       added_on as addedOn, added_by as addedBy, unit_price as unitPrice, cost, cover_image as coverImage,
       manufacturer_id as manufacturerId, supplier_id as supplierId, status
       from product where code='${id}'`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No product found.'));
        } else {
          const {
            code,
            name,
            categoryId,
            storeId,
            sku,
            description,
            quantity,
            allowQuantity,
            addedOn,
            addedBy,
            unitPrice,
            cost,
            coverImage,
            manufacturerId,
            supplierId,
            status,
          } = results[0];
          resolve(
            new Product(
              code,
              name,
              categoryId,
              storeId,
              sku,
              description,
              quantity,
              allowQuantity,
              moment(addedOn).format('YYYY-MM-DD HH:mm:ss'),
              addedBy,
              unitPrice,
              cost,
              coverImage,
              manufacturerId,
              supplierId,
              status
            )
          );
        }
      }
    );
  });
};

Product.prototype.getTotalCountByStoreId = function (id, search = null) {
  return new Promise((resolve, reject) => {
    let sql = `select count(*) as total from product where store_id='${id}'`;

    if (search) {
      sql += ` and status=1 and (code like '%${search}%' or name like '%${search}%' or sku like '%${search}%')`;
    }

    (this.db || db).query(sql, (error, results) => {
      if (error) {
        reject(new NoRecordFoundError('No products found.'));
      } else {
        resolve(results[0].total);
      }
    });
  });
};

Product.prototype.getAllByStoreId = function (id, page = 1, pageSize = 20, search = null) {
  return new Promise((resolve, reject) => {
    let sql = `select code, name, category_id as categoryId, store_id as storeId, sku, description, quantity, 
               allow_quantity as allowQuantity, added_on as addedOn, added_by as addedBy, unit_price as unitPrice, 
               cost, cover_image as coverImage, manufacturer_id as manufacturerId, supplier_id as supplierId, status
               from product where store_id='${id}'`;

    if (search) {
      sql += ` and status=1 and (code like '%${search}%' or name like '%${search}%' or sku like '%${search}%')`;
    }

    sql += ` order by added_on desc limit ${(page - 1) * pageSize}, ${pageSize}`;

    (this.db || db).query(sql, (error, results) => {
      if (error) {
        reject(new NoRecordFoundError('No products found.'));
      } else {
        const products = results.map(product => {
          const {
            code,
            name,
            categoryId,
            storeId,
            sku,
            description,
            quantity,
            allowQuantity,
            addedOn,
            addedBy,
            unitPrice,
            cost,
            coverImage,
            manufacturerId,
            supplierId,
            status,
          } = product;
          return new Product(
            code,
            name,
            categoryId,
            storeId,
            sku,
            description,
            quantity,
            allowQuantity,
            moment(addedOn).format('YYYY-MM-DD HH:mm:ss'),
            addedBy,
            unitPrice,
            cost,
            coverImage,
            manufacturerId,
            supplierId,
            status
          );
        });

        resolve(products);
      }
    }
    );
  });
};

Product.prototype.add = function (product) {
  let proceed = true;

  return new Promise((resolve, reject) => {
    if (product instanceof Product) {
      Object.keys(product).forEach(function (key, index) {
        if (product[key] === undefined) {
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
        categoryId,
        storeId,
        sku,
        description,
        quantity,
        allowQuantity,
        addedOn,
        addedBy,
        unitPrice,
        cost,
        coverImage,
        manufacturerId,
        supplierId,
      } = product;

      (this.db || db).query(
        `insert into product(code, name, category_id, store_id, sku, description, quantity, allow_quantity, added_on, added_by, 
         unit_price, cost, cover_image, manufacturer_id, supplier_id) 
         values('${code}', '${name}', '${categoryId}', '${storeId}', '${sku}', '${description}', ${quantity}, ${allowQuantity}, 
         '${addedOn}', '${addedBy}', ${unitPrice}, ${cost}, '${coverImage}', '${manufacturerId}', '${supplierId}')`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalid product data.'));
          } else {
            resolve(
              new Product(
                code,
                name,
                categoryId,
                storeId,
                sku,
                description,
                quantity,
                allowQuantity,
                addedOn,
                addedBy,
                unitPrice,
                cost,
                coverImage,
                manufacturerId,
                supplierId,
                true
              )
            );
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalid product data.'));
    }
  });
};

Product.prototype.update = function (product) {
  return new Promise((resolve, reject) => {
    if (product instanceof Product) {
      const {
        code,
        name,
        categoryId,
        storeId,
        sku,
        description,
        quantity,
        allowQuantity,
        addedBy,
        unitPrice,
        cost,
        coverImage,
        manufacturerId,
        supplierId,
      } = product;

      (this.db || db).query(
        `update product set name='${name}', category_id='${categoryId}', sku='${sku}', description='${description}', quantity=${quantity}, 
         allow_quantity=${allowQuantity}, unit_price=${unitPrice}, cost=${cost}, cover_image='${coverImage}', 
         manufacturer_id='${manufacturerId}', supplier_id='${supplierId}'
         where code='${code}' and added_by='${addedBy}'`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalid product data.'));
          } else {
            resolve(
              new Product(
                code,
                name,
                categoryId,
                storeId,
                sku,
                description,
                quantity,
                allowQuantity,
                null,
                addedBy,
                unitPrice,
                cost,
                coverImage,
                manufacturerId,
                supplierId
              )
            );
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalid product data.'));
    }
  });
};

Product.prototype.delete = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update product set status=0 where code='${code}'`,
      (error, results) => {

        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Archiving product failed.'));
        } else {
          resolve('Product archived.');
        }
      }
    );
  });
};

Product.prototype.activate = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update product set status=1 where code='${code}'`,
      (error, results) => {

        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Activating product failed.'));
        } else {
          resolve('Product activated.');
        }
      }
    );
  });
};

function ProductAttribute(
  code,
  attributeName,
  productId,
  quantity,
  varPrice,
  addedOn,
  addedBy,
  productAttributeCategoryId,
  productAttributeCategoryName,
  status,
  dbConn
) {
  // If a field is optional then provide default empty value
  this.code = code;
  this.attributeName = attributeName;
  this.productId = productId;
  this.quantity = quantity;
  this.varPrice = varPrice;
  this.addedOn = addedOn;
  this.addedBy = addedBy;
  this.productAttributeCategoryId = productAttributeCategoryId;
  this.productAttributeCategoryName = productAttributeCategoryName || '';
  this.status = status || 1;
  if (dbConn !== undefined) {
    this.db = dbConn;
  }
}

ProductAttribute.prototype.get = function (id) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, product_id as productId, pa.name as attributeName, quantity, var_price as varPrice, added_on as addedOn, added_by as addedBy, 
       product_attribute_category_id as productAttributeCategoryId, pac.name as productAttributeCategoryName, status 
       from product_attribute as pa left join product_attribute_category as pac on pa.product_attribute_category_id = pac.id
       where code='${id}'`,
      (error, results) => {
        if (error || results.length == 0) {
          reject(new NoRecordFoundError('No product attribute found.'));
        } else {
          const {
            code,
            attributeName,
            productId,
            quantity,
            varPrice,
            addedOn,
            addedBy,
            productAttributeCategoryId,
            productAttributeCategoryName,
            status,
          } = results[0];
          resolve(
            new ProductAttribute(
              code,
              attributeName,
              productId,
              quantity,
              varPrice,
              addedOn,
              addedBy,
              productAttributeCategoryId,
              productAttributeCategoryName,
              status
            )
          );
        }
      }
    );
  });
};

ProductAttribute.prototype.getAllByProductId = function (id) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, product_id as productId, pa.name as attributeName, quantity, var_price as varPrice, added_on as addedOn, added_by as addedBy, 
       product_attribute_category_id as productAttributeCategoryId, pac.name as productAttributeCategoryName, status 
       from product_attribute as pa left join product_attribute_category as pac on pa.product_attribute_category_id = pac.id
       where product_id='${id}' and status=1`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No product attributes found.'));
        } else {
          const productAttributes = results.map(attr => {
            const {
              code,
              attributeName,
              productId,
              quantity,
              varPrice,
              addedOn,
              addedBy,
              productAttributeCategoryId,
              productAttributeCategoryName,
              status,
            } = attr;
            return new ProductAttribute(
              code,
              attributeName,
              productId,
              quantity,
              varPrice,
              addedOn,
              addedBy,
              productAttributeCategoryId,
              productAttributeCategoryName,
              status
            );
          });

          resolve(productAttributes);
        }
      }
    );
  });
};

ProductAttribute.prototype.add = function (productAttribute) {
  let proceed = true;

  return new Promise((resolve, reject) => {
    if (productAttribute instanceof ProductAttribute) {
      Object.keys(productAttribute).forEach(function (key, index) {
        if (productAttribute[key] === undefined) {
          reject(
            new InvalidModelArgumentsError(
              'Not all required attribute fields have a value.'
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
        attributeName,
        productId,
        quantity,
        varPrice,
        addedOn,
        addedBy,
        productAttributeCategoryId,
      } = productAttribute;

      (this.db || db).query(
        `insert into product_attribute(code, product_id, name, quantity, var_price, added_on, added_by, product_attribute_category_id) 
         values('${code}', '${productId}', '${attributeName}', ${quantity}, ${varPrice}, '${addedOn}', '${addedBy}', ${productAttributeCategoryId})`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalid product attribute data.'));
          } else {
            resolve(
              new ProductAttribute(
                code,
                attributeName,
                productId,
                quantity,
                varPrice,
                addedOn,
                addedBy,
                productAttributeCategoryId,
                '',
                true,
              )
            );
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalid product attribute data.'));
    }
  });
};

ProductAttribute.prototype.update = function (productAttribute) {
  return new Promise((resolve, reject) => {
    if (productAttribute instanceof ProductAttribute) {
      const {
        code,
        attributeName,
        productId,
        quantity,
        varPrice,
        addedBy,
        productAttributeCategoryId,
      } = productAttribute;

      (this.db || db).query(
        `update product_attribute set name='${attributeName}', product_id='${productId}', quantity=${quantity}, 
         var_price=${varPrice}, product_attribute_category_id=${productAttributeCategoryId}
         where code='${code}' and added_by='${addedBy}'`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalid product attribute data.'));
          } else {
            resolve(
              new ProductAttribute(
                code,
                attributeName,
                productId,
                quantity,
                varPrice,
                null,
                addedBy,
                productAttributeCategoryId,
              )
            );
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalid product attribute data.'));
    }
  });
};

ProductAttribute.prototype.delete = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update product_attribute set status=0 where code='${code}'`,
      (error, results) => {
        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Archiving product attribute failed.'));
        } else {
          resolve('Product attribute archived.');
        }
      }
    );
  });
};

ProductAttribute.prototype.activate = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update product_attribute set status=1 where code='${code}'`,
      (error, results) => {
        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Activating product attribute failed.'));
        } else {
          resolve('Product attribute activated.');
        }
      }
    );
  });
};

module.exports = {
  Product,
  ProductAttribute,
};
