const auth = require('./auth');
const common = require('./common');
const product = require('./product');
const store = require('./store');
const order = require('./order');
const category = require('./category');
const supplier = require('./supplier');
const manufacturer = require('./manufacturer');

module.exports = {
  auth,
  store,
  common,
  product,
  order,
  category,
  supplier,
  manufacturer,
};