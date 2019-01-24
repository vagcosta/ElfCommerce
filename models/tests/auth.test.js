'use strict';

const chai = require('chai');
chai.use(require('chai-as-promised'));
const {
  OAuth2Request,
  OAuth2Response,
} = require('../auth');

const expect = chai.expect;

describe('Test OAuth models', () => {
  const auth = OAuth2Request();

  it('Should return an OAuth2Response object with an valid OAuth2Request request object', async () => {
    const res = await auth.auth('test@test.com', '123', 'password', '');
    expect(res).to.be.an.instanceof(OAuth2Response);
  });
});
