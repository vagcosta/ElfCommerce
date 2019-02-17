'use strict';

const router = require('express').Router();
const { sendEmail } = require('freetier');
const moment = require('moment');
const shortid = require('shortid');
const uniqid = require('uniqid');
const randomstring = require('randomstring');
const md5 = require('md5');
require('dotenv').load();
const {
  authMiddleware,
  storeIdVerifier,
} = require('../middlewares');
const {
  Account,
} = require('../models');
const {
  senderEmail,
  sendgridApiKey,
  sendgridDailyLimit,
  elasticemailApiKey,
  elasticemailDailyLimit,
} = process.env;


router.get(
  '/stores/:storeId/accounts',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const account = new Account();
      const data = await account.getAllByStoreId(
        req.params.storeId,
        req.query.page || 1,
        req.query.size || 20
      );
      const count = await account.getTotalCountByStoreId(
        req.params.storeId
      );

      res.send({ data, count });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.post('/stores/:storeId/accounts',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      //TODO: make sure the current user who creating a new account has admin right
      const salt = randomstring.generate(32);
      const pwd = req.body.password || randomstring.generate(8);
      const account = new Account(
        uniqid(),
        req.params.storeId,
        req.body.name,
        req.body.email,
        md5(`${pwd + salt}`),
        salt,
        moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        req.body.role,
        1
      );
      const data = await account.add(account);
      const result = await sendEmail({
        to: req.body.email,
        from: senderEmail,
        subject: 'Your new account has been created.',
        message: `Hi ${req.body.name}: <br /><br />Your account has been created and your temp password is: <b>${pwd}</b>.<br /><br />Please change your password after login.`,
        recipient: req.body.name,
        sender: 'Admin',
      }, {
          elasticEmail: { apiKey: elasticemailApiKey, dailyLimit: elasticemailDailyLimit },
          sendGrid: { apiKey: sendgridApiKey, dailyLimit: sendgridDailyLimit },
        });
      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  });

router.get(
  '/stores/:storeId/accounts/:accountId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const acct = new Account();
      const data = await acct.get(req.params.accountId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);


router.put(
  '/stores/:storeId/accounts/:accountId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const {
        name,
        url,
        email,
        contact,
        address,
        logo,
        countryId,
      } = req.body;
      const account = new Account(
        req.params.accountId,
        name,
        url,
        email,
        contact,
        address,
        logo,
        req.params.storeId,
        countryId,
        res.locals.auth.accountId
      );
      const data = await account.update(account);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.patch(
  '/stores/:storeId/accounts/:accountId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const account = new Account();
      const data = await account.activate(req.params.accountId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.delete(
  '/stores/:storeId/accounts/:accountId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const account = new Account();
      const data = await account.delete(req.params.accountId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

module.exports = router;