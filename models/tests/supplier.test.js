'use strict';

const chai = require('chai');
const shortid = require('shortid');
require('dotenv').load();
chai.use(require('chai-as-promised'));
const { MySQL } = require('../../db');
const Supplier = require('../supplier');

const expect = chai.expect;
const { host, user, password, testDb } = process.env;

describe('Test supplier model', () => {
  const supplier = new Supplier(
    shortid.generate(),
    'Supplier ' + shortid.generate(),
    'https://' + shortid.generate() + '.com',
    'example@' + shortid.generate() + '.com',
    '+123456789',
    'Address 1',
    '',
    'store123',
    1,
    '40s1cqdw6jmyyiixe',
    true,
    new MySQL(host, user, password, testDb)
  );

  it('should return a new supplier object by calling add method', async () => {
    const res = await supplier.add(supplier);
    expect(res).to.be.an.instanceof(Supplier);
  });

  it('should return an error by calling add method if required field(s) not provided', async () => {
    const supplier = new Supplier(
      undefined,
      'Supplier ' + shortid.generate(),
      'https://' + shortid.generate() + '.com',
      'example@' + shortid.generate() + '.com',
      '+123456789',
      'Address 1',
      '',
      'store123',
      1,
      '40s1cqdw6jmyyiixe',
      true,
      new MySQL(host, user, password, testDb)
    );

    await expect(supplier.add(supplier)).to.be.rejected;
  });

  it('should return a updated supplier object by calling update method', async () => {
    supplier.address = 'Updated address';
    const res = await supplier.update(supplier);
    expect(res.address).to.be.equal(supplier.address);
  });

  it('should return a supplier object by calling get method', async () => {
    const res = await supplier.get(supplier.code);
    expect(res).to.be.an.instanceof(Supplier);
  });

  it('should return a list of supplier object by calling getAllByStoreId method', async () => {
    const res = await supplier.getAllByStoreId('store123');
    expect(res).to.be.an('array');
    expect(res[0]).to.be.an.instanceof(Supplier);
  });
});
