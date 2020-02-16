'use strict';

const router = require('express').Router();
const shortid = require('shortid');
require('dotenv').load();
const {
  authMiddleware,
  storeIdVerifier,
} = require('../middlewares');
const {
  Manufacturer,
} = require('../models');
const { UnauthorisedError } = require('../exceptions');

router.get(
  '/stores/:storeId/manufacturers',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const manufacturer = new Manufacturer();
      const data = await manufacturer.getAllByStoreId(
        req.params.storeId,
        req.query.page || 1,
        req.query.size || 20,
        req.query.activeOnly ? true : false
      );
      const count = await manufacturer.getTotalCountByStoreId(
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
  '/stores/:storeId/manufacturers',
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
      const manufacturer = new Manufacturer(
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
      const data = await manufacturer.add(manufacturer);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.get(
  '/stores/:storeId/manufacturers/:manufacturerId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const manufacturer = new Manufacturer();
      const data = await manufacturer.get(req.params.manufacturerId);

      if (data.storeId !== req.params.storeId) {
        throw new UnauthorisedError('Invalid manufacturer ID.');
      }

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.put(
  '/stores/:storeId/manufacturers/:manufacturerId',
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
      const manufacturer = new Manufacturer(
        req.params.manufacturerId,
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
      const data = await manufacturer.update(manufacturer);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.patch(
  '/stores/:storeId/manufacturers/:manufacturerId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const manufacturer = new Manufacturer();
      const data = await manufacturer.activate(req.params.manufacturerId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.delete(
  '/stores/:storeId/manufacturers/:manufacturerId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const manufacturer = new Manufacturer();
      const data = await manufacturer.delete(req.params.manufacturerId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

module.exports = router;