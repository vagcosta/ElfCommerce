'use strict';

const chai = require('chai');
chai.use(require('chai-as-promised'));
const Order = require('../order');

const expect = chai.expect;

describe('Test order model', () => {
  it('should return a new order object', () => {
    const order = new Order(
      'adsfhajksdhf2342',
      'store-abcdefghijklmn',
      '2018-11-11 11:11:00',
      '40s1cqdw6jmyyiixe',
      '2018-11-12 11:11:00',
      'Delivery address 1',
      'Billing address 1',
      '123123124',
      [],
      true
    );
  });
});
