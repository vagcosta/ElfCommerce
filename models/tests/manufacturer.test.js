'use strict';

const chai = require('chai');
const shortid = require('shortid');
require('dotenv').load();
chai.use(require('chai-as-promised'));
const { MySQL } = require('../../db');
const Manufacturer = require('../manufacturer');

const expect = chai.expect;
const { dbHost, dbUser, dbPassword, testDbName } = process.env;

describe('Test manufacturer model', () => {
  const manufacturer = new Manufacturer(
    shortid.generate(),
    'Manufacturer ' + shortid.generate(),
    'https://' + shortid.generate() + '.com',
    'example@' + shortid.generate() + '.com',
    '+123456789',
    'Address 1',
    '',
    'store123',
    1,
    '40s1cqdw6jmyyiixe',
    true,
    new MySQL(dbHost, dbUser, dbPassword, testDbName)
  );

  it('should return a new manufacturer object by calling add method', async () => {
    const res = await manufacturer.add(manufacturer);
    expect(res).to.be.an.instanceof(Manufacturer);
  });

  it('should return an error by calling add method if required field(s) not provided', async () => {
    const manufacturer = new Manufacturer(
      undefined,
      'Manufacturer ' + shortid.generate(),
      'https://' + shortid.generate() + '.com',
      'example@' + shortid.generate() + '.com',
      '+123456789',
      'Address 1',
      '',
      'store123',
      1,
      '40s1cqdw6jmyyiixe',
      true,
      new MySQL(dbHost, dbUser, dbPassword, testDbName)
    );

    await expect(manufacturer.add(manufacturer)).to.be.rejected;
  });

  it('should return a updated manufacturer object by calling update method', async () => {
    manufacturer.address = 'Updated address';
    const res = await manufacturer.update(manufacturer);
    expect(res.address).to.be.equal(manufacturer.address);
  });

  it('should return a manufacturer object by calling get method', async () => {
    const res = await manufacturer.get(manufacturer.code);
    expect(res).to.be.an.instanceof(Manufacturer);
  });

  it('should return a list of manufacturer object by calling getAllByStoreId method', async () => {
    const res = await manufacturer.getAllByStoreId('store123');
    expect(res).to.be.an('array');
    expect(res[0]).to.be.an.instanceof(Manufacturer);
  });

  it('should return a confirmation message by calling delete method', async () => {
    const res = await manufacturer.delete(manufacturer.code);
    expect(res).to.be.equal('Manufacturer archived.');
  });

  it('should return a confirmation message by calling activate method', async () => {
    const res = await manufacturer.activate(manufacturer.code);
    expect(res).to.be.equal('Manufacturer activated.');
  });
});
