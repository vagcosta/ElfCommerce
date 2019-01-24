const assert = require('assert');
const { Product } = require('../product');

describe('Create a new product object', () => {
  it('should return a new product object', () => {
    const product = new Product(
      'alsdfjal23rj2ladlsf23',
      'Sample Product',
      'category-asdfasd23r2jk3hfads',
      'store-abcdefghijklmn',
      'sku-1234567',
      'Product description',
      999,
      true,
      '2018-11-11 11:11:00',
      '123',
      100.00,
      80.00,
      'https://vignette.wikia.nocookie.net/universeconquest/images/e/e6/Sample.jpg/revision/latest/scale-to-width-down/640?cb=20171003194302',
      'manufacture-asdfasdf',
      'supplier-adfsadsf',
      true
    );

    assert.equal(product instanceof Product, true);
  });
});
