'use strict';

const chai = require('chai');
const shortid = require('shortid');
require('dotenv').load();
chai.use(require('chai-as-promised'));
const moment = require('moment');
const { MySQL } = require('../../db');
const { Product } = require('../product');

const expect = chai.expect;
const { dbHost, dbUser, dbPassword, testDbName } = process.env;

describe('Create a new product object', () => {
  const product = new Product(
    shortid.generate(),
    'Test Product' + shortid.generate(),
    'category-asdfasd23r2jk3hfads',
    'store123',
    'sku-1234567',
    'Product description',
    999,
    true,
    moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    '40s1cqdw6jmyyiixe',
    100.00,
    80.00,
    'https://vignette.wikia.nocookie.net/universeconquest/images/e/e6/Sample.jpg/revision/latest/scale-to-width-down/640?cb=20171003194302',
    'manufacture-asdfasdf',
    'supplier-adfsadsf',
    true,
    new MySQL(dbHost, dbUser, dbPassword, testDbName)
  );

  it('should return a new product object by calling add method', async () => {
    const res = await product.add(product);
    expect(res).to.be.an.instanceof(Product);
  });

  it('should return a updated manufacturer object by calling update method', async () => {
    product.description = 'Updated product description';
    const res = await product.update(product);
    expect(res.description).to.be.equal(product.description);
  });

  it('should return a product object by calling get method', async () => {
    const res = await product.get(product.code);
    expect(res).to.be.an.instanceof(Product);
  });

  it('should return a list of product object by calling getAllByStoreId method', async () => {
    const res = await product.getAllByStoreId('store123');
    expect(res).to.be.an('array');
    expect(res[0]).to.be.an.instanceof(Product);
  });
});
