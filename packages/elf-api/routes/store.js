'use strict';

const router = require('express').Router();
require('dotenv').load();
const {
  authMiddleware,
  storeIdVerifier,
} = require('../middlewares');
const {
  Store,
  StoreSummary,
} = require('../models');

router.get(
  '/stores/:storeId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const store = new Store();
      const data = await store.get(req.params.storeId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.put(
  '/stores/:storeId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const {
        code,
        name,
        description,
        logo,
        countryId,
        language,
        currencyId,
      } = req.body;
      const store = new Store(
        req.params.storeId,
        name,
        description,
        logo,
        countryId,
        language,
        currencyId,
        res.locals.auth.accountId
      );
      const data = await store.update(store);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.post(
  '/stores/:storeId/images',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      // const store = new Store();
      // const data = await store.get(req.params.storeId);

      // res.send(data);
      res.send('Success');
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.get(
  '/stores/:storeId/summary',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const summary = new StoreSummary();
      const data = await summary.get(req.params.storeId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

module.exports = router;