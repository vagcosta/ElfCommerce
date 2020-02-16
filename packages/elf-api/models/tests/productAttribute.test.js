'use strict';

const chai = require('chai');
const shortid = require('shortid');
require('dotenv').load();
chai.use(require('chai-as-promised'));
const moment = require('moment');
const { MySQL } = require('../../db');
const { ProductAttribute } = require('../product');

const expect = chai.expect;
const { dbHost, dbUser, dbPassword, testDbName } = process.env;

describe('Create a new product attribute object', () => {
  const attr = new ProductAttribute(
    shortid.generate(),
    'Small-' + shortid.generate(),
    'product-asdfasd23r2jk3hfads',
    10,
    23.00,
    moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    '40s1cqdw6jmyyiixe',
    2,
    '',
    true,
    new MySQL(dbHost, dbUser, dbPassword, testDbName)
  );

  it('should return a new product attribute object by calling add method', async () => {
    const res = await attr.add(attr);
    expect(res).to.be.an.instanceof(ProductAttribute);
  });

  it('should return a updated product attribute object by calling update method', async () => {
    attr.varPrice = 26.00;
    const res = await attr.update(attr);
    expect(res.varPrice).to.be.equal(attr.varPrice);
  });

  it('should return a product attribute object by calling get method', async () => {
    const res = await attr.get(attr.code);
    expect(res).to.be.an.instanceof(ProductAttribute);
  });

  it('should return a list of product attribute object by calling getAllByProductId method', async () => {
    const res = await attr.getAllByProductId('product-asdfasd23r2jk3hfads');
    expect(res).to.be.an('array');
    expect(res[0]).to.be.an.instanceof(ProductAttribute);
  });

  it('should return a confirmation message by calling delete method', async () => {
    const res = await attr.delete(attr.code);
    expect(res).to.be.equal('Product attribute archived.');
  });

  it('should return a confirmation message by calling activate method', async () => {
    const res = await attr.activate(attr.code);
    expect(res).to.be.equal('Product attribute activated.');
  });
});
