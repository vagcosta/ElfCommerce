'use strict';

const router = require('express').Router();
const shortid = require('shortid');
require('dotenv').load();
const {
  authMiddleware,
  storeIdVerifier,
} = require('../middlewares');
const {
  Supplier,
} = require('../models');
const { UnauthorisedError } = require('../exceptions');

router.get(
  '/stores/:storeId/suppliers',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const supplier = new Supplier();
      const data = await supplier.getAllByStoreId(
        req.params.storeId,
        req.query.page || 1,
        req.query.size || 20,
        req.query.activeOnly ? true : false
      );
      const count = await supplier.getTotalCountByStoreId(
        req.params.storeId,
        req.query.activeOnly ? true : false
      );

      res.send({ data, count });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.post(
  '/stores/:storeId/suppliers',
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
      const supplier = new Supplier(
        shortid.generate(),
        name,
        url,
        email,
        contact,
        address,
        logo,
        req.params.storeId,
        countryId,
        res.locals.auth.accountId,
        1
      );
      const data = await supplier.add(supplier);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.get(
  '/stores/:storeId/suppliers/:supplierId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const supplier = new Supplier();
      const data = await supplier.get(req.params.supplierId);

      if (data.storeId !== req.params.storeId) {
        throw new UnauthorisedError('Invalid supplier ID.');
      }

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.put(
  '/stores/:storeId/suppliers/:supplierId',
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
      const supplier = new Supplier(
        req.params.supplierId,
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
      const data = await supplier.update(supplier);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.patch(
  '/stores/:storeId/suppliers/:supplierId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const supplier = new Supplier();
      const data = await supplier.activate(req.params.supplierId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.delete(
  '/stores/:storeId/suppliers/:supplierId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const supplier = new Supplier();
      const data = await supplier.delete(req.params.supplierId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

module.exports = router;