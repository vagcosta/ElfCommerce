'use strict';

const chai = require('chai');
chai.use(require('chai-as-promised'));
require('dotenv').load();
const { MySQL } = require('../../db');
const {
  OAuth2Request,
  OAuth2Response,
} = require('../auth');

const expect = chai.expect;
const { dbHost, dbUser, dbPassword, testDbName } = process.env;

describe('Test OAuth models', () => {
  const auth = new OAuth2Request(new MySQL(dbHost, dbUser, dbPassword, testDbName));
  let res = null;

  it('Should return an OAuth2Response object with a valid OAuth2Request request object', async () => {
    res = await auth.authByPassword('test@test.com', '123');
    expect(res).to.be.an.instanceof(OAuth2Response);
  });

  it('Should return true a valid access token', async () => {
    const newRes = await auth.validateToken(res.accessToken);
    expect(newRes.valid).to.be.equal(true);
  });

  it('Should return a new OAuth2Response object after calling refreshToken method with a valid access token', async () => {
    const newRes = await auth.refreshToken(res.refreshToken);
    expect(newRes).to.be.an.instanceof(OAuth2Response);
    expect(res.accessToken).to.not.equal(newRes.accessToken);
  });

  it('Should return an Error when wrong username or password provided', async () => {
    await expect(auth.authByPassword('test@test.com', '1234')).to.be.rejected;
  });
});
