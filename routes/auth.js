'use strict';

const router = require('express').Router();
const uniqid = require('uniqid');
const randomstring = require('randomstring');
const md5 = require('md5');
require('dotenv').load();
const {
  authMiddleware,
  userCodeVerifier,
} = require('../middlewares');
const {
  OAuth2Request,
  User,
} = require('../models');

router.post('/auth', async (req, res) => {
  try {
    let data = null;
    if (!req.body.refreshToken) {
      const auth = new OAuth2Request();
      if (req.body.grantType === 'password') {

        //TODO: Check for req.body.scope
        data = await auth.authByPassword(
          req.body.username,
          req.body.password,
        );
      }

      res.send(data);
    } else {
      const auth = new OAuth2Request();
      data = await auth.refreshToken(req.body.refreshToken);
      res.send(data);
    }
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
});

router.post('/accounts', async (req, res) => {
  try {
    const salt = randomstring.generate(32);
    const user = new User(
      uniqid(),
      req.body.name,
      req.body.email,
      md5(`${req.body.password + salt}`),
      salt
    );
    const data = await user.add(user);

    res.send(data);
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
});

router.get(
  '/accounts/:accountId',
  [authMiddleware, userCodeVerifier],
  async (req, res) => {
    try {
      const user = new User();
      const data = await user.get(req.params.accountId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

module.exports = router;