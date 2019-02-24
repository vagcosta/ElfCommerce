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

function Order(
  code,
  storeId,
  addedOn,
  addedBy,
  paidOn,
  customerName,
  shippingAddress,
  billingAddress,
  customerContact,
  products,
  status,
  dbConn
) {
  // If a field is optional then provide default empty value
  this.code = code;
  this.storeId = storeId;
  this.addedOn = addedOn || moment.utc().format('YYYY-MM-DD HH:mm:ss');
  this.addedBy = addedBy;
  this.paidOn = paidOn || null;
  this.customerName = customerName;
  this.shippingAddress = shippingAddress;
  this.billingAddress = billingAddress;
  this.customerContact = customerContact || '';
  this.products = products;
  this.status = status;
  if (dbConn !== undefined) {
    this.db = dbConn;
  }
}

Order.prototype.get = function (id) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, store_id as storeId, added_by as addedBy, added_on as addedOn, paid_on as paidOn, 
       customer_name as customerName, shipping_address as shippingAddress, billing_address as billingAddress, 
       customer_contact as customerContact, status
       from \`order\`
       where code='${id}'`,
      (error, results) => {
        if (error || results.length == 0) {
          reject(new NoRecordFoundError('No order found.'));
        } else {
          const order = results[0];
          (this.db || db).query(
            `select p.code, p.name, p.sku, op.purchasing_price as unitPrice, op.quantity
             from product as p
             right join order_product as op on p.code = op.product_id
             where order_id='${id}' and op.status=1`,
            (error, results) => {
              if (error || results.length == 0) {
                order.products = [];
              } else {
                order.products = results.map(product => {
                  const {
                    code,
                    name,
                    sku,
                    unitPrice,
                    quantity,
                  } = product;
                  return {
                    code,
                    name,
                    sku,
                    unitPrice,
                    quantity,
                  };
                });
              }

              resolve(order);
            }
          );
        }
      }
    );
  });
};

Order.prototype.getTotalCountByStoreId = function (id) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select count(*) as total 
       from \`order\` where store_id='${id}'`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No orders found.'));
        } else {
          resolve(results[0].total);
        }
      }
    );
  });
};

Order.prototype.getAllByStoreId = function (id, page = 1, pageSize = 20) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `select code, store_id as storeId, added_by as addedBy, added_on as addedOn, paid_on as paidOn, 
       customer_name as customerName, shipping_address as shippingAddress, billing_address as billingAddress, 
       customer_contact as customerContact, status
       from \`order\`
       where store_id='${id}' order by added_on desc limit ${(page - 1) *
      pageSize}, ${pageSize}`,
      (error, results) => {
        if (error) {
          reject(new NoRecordFoundError('No orders found.'));
        } else {
          const orders = results.map(order => {
            const {
              code,
              storeId,
              addedOn,
              addedBy,
              paidOn,
              customerName,
              shippingAddress,
              billingAddress,
              customerContact,
              products,
              status,
            } = order;
            return new Order(
              code,
              storeId,
              moment(addedOn).format('YYYY-MM-DD HH:mm:ss'),
              addedBy,
              paidOn,
              customerName,
              shippingAddress,
              billingAddress,
              customerContact,
              products,
              status
            );
          });

          resolve(orders);
        }
      }
    );
  });
};

Order.prototype.add = function (order) {
  return new Promise((resolve, reject) => {
    let proceed = true;

    if (order instanceof Order) {
      Object.keys(order).forEach(function (key, index) {
        if (order[key] === undefined) {
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
        addedOn,
        addedBy,
        paidOn,
        customerName,
        shippingAddress,
        billingAddress,
        customerContact,
        products,
      } = order;

      (this.db || db).query(
        `insert into \`order\`(code, store_id, added_on, added_by, paid_on, customer_name, shipping_address, billing_address, customer_contact) 
         values('${code}', '${storeId}', '${addedOn}', '${addedBy}', ` + (paidOn ? `'${paidOn}'` : null) + `, '${customerName}', '${shippingAddress}', '${billingAddress}', '${customerContact}')`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalid order data.'));
          } else {
            if (products.length > 0) {
              let sql = 'insert into order_product(product_id, purchasing_price, order_id, quantity) values';

              products.forEach(product => {
                sql += ` ('${product.code}', ${product.unitPrice}, '${code}', ${product.quantity}),`;
              });

              sql = sql.slice(0, -1);
              sql += ';';

              (this.db || db).query(sql, (error, results) => {
                if (error || results.affectedRows == 0) {
                  reject(new BadRequestError('Invalid order data.'));
                } else {
                  resolve(
                    new Order(
                      code,
                      storeId,
                      moment(addedOn).format('YYYY-MM-DD HH:mm:ss'),
                      addedBy,
                      paidOn,
                      customerName,
                      shippingAddress,
                      billingAddress,
                      customerContact,
                      products,
                      true
                    )
                  );
                }
              });
            } else {
              resolve(
                new Order(
                  code,
                  storeId,
                  moment(addedOn).format('YYYY-MM-DD HH:mm:ss'),
                  addedBy,
                  paidOn,
                  customerName,
                  shippingAddress,
                  billingAddress,
                  customerContact,
                  products,
                  true
                )
              );
            }
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalid order data.'));
    }
  });
};

Order.prototype.update = function (order) {
  return new Promise((resolve, reject) => {
    if (order instanceof Order) {
      const {
        code,
        storeId,
        addedBy,
        paidOn,
        customerName,
        shippingAddress,
        billingAddress,
        customerContact,
        products,
      } = order;

      (this.db || db).query(
        `update \`order\` set paid_on=` + (paidOn ? `'${paidOn}'` : null) + `, customer_name='${customerName}', 
         shipping_address='${shippingAddress}', billing_address='${billingAddress}', customer_contact='${customerContact}'
         where code='${code}' and added_by='${addedBy}'`,
        (error, results) => {
          if (error || results.affectedRows == 0) {
            reject(new BadRequestError('Invalid order data.'));
          } else {
            (this.db || db).query(
              `update order_product set status=0
               where order_id='${code}' and status=1`, (error, results) => {
                if (error) {
                  reject(new BadRequestError('Invalid order product data.'));
                } else {
                  if (products.length > 0) {
                    let sql = 'insert into order_product(product_id, purchasing_price, order_id, quantity) values';

                    products.forEach(product => {
                      sql += ` ('${product.code}', ${product.unitPrice}, '${code}', ${product.quantity}),`;
                    });

                    sql = sql.slice(0, -1);
                    sql += ';';

                    (this.db || db).query(sql, (error, results) => {
                      if (error || results.affectedRows == 0) {
                        reject(new BadRequestError('Invalid order product data.'));
                      } else {
                        resolve(
                          new Order(
                            code,
                            storeId,
                            '',
                            addedBy,
                            paidOn,
                            customerName,
                            shippingAddress,
                            billingAddress,
                            customerContact,
                            products
                          )
                        );
                      }
                    });
                  } else {
                    resolve(
                      new Order(
                        code,
                        storeId,
                        '',
                        addedBy,
                        paidOn,
                        customerName,
                        shippingAddress,
                        billingAddress,
                        customerContact,
                        products
                      )
                    );
                  }
                }
              }
            );
          }
        }
      );
    } else {
      reject(new BadRequestError('Invalid order data.'));
    }
  });
};

Order.prototype.delete = function (code) {
  return new Promise((resolve, reject) => {
    (this.db || db).query(
      `update \`order\` set status=0 where code='${code}'`,
      (error, results) => {

        if (error || results.affectedRows == 0) {
          reject(new BadRequestError('Deleting order failed.'));
        } else {
          resolve('Order deleted.');
        }
      }
    );
  });
};

module.exports = Order;