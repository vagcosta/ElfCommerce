'use strict';

const router = require('express').Router();
const uuidv1 = require('uuid/v1');
const moment = require('moment');
require('dotenv').load();
const {
  authMiddleware,
  storeIdVerifier,
} = require('../middlewares');
const {
  Order,
  ProductAttribute,
} = require('../models');
const { UnauthorisedError } = require('../exceptions');

router.get(
  '/stores/:storeId/orders',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const order = new Order();
      const data = await order.getAllByStoreId(req.params.storeId, req.query.page || 1, req.query.size || 20);
      const count = await order.getTotalCountByStoreId(req.params.storeId);

      res.send({ data, count });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.get(
  '/stores/:storeId/orders/:orderId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const order = new Order();
      const data = await order.get(req.params.orderId);

      if (data.storeId !== req.params.storeId) {
        throw new UnauthorisedError('Invalid order ID.');
      }

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.put(
  '/stores/:storeId/orders/:orderId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const {
        paidOn,
        customerName,
        shippingAddress,
        billingAddress,
        customerContact,
        products,
      } = req.body;

      const order = new Order(
        req.params.orderId,
        req.params.storeId,
        null,
        res.locals.auth.accountId,
        paidOn,
        customerName,
        shippingAddress,
        billingAddress,
        customerContact,
        products
      );
      const data = await order.update(order);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.post(
  '/stores/:storeId/orders',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const {
        paidOn,
        customerName,
        shippingAddress,
        billingAddress,
        customerContact,
        products,
      } = req.body;

      const order = new Order(
        uuidv1(),
        req.params.storeId,
        moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        res.locals.auth.accountId,
        paidOn,
        customerName,
        shippingAddress,
        billingAddress,
        customerContact,
        products
      );
      const data = await order.add(order);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.delete(
  '/stores/:storeId/orders/:orderId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const order = new Order();
      const data = await order.delete(req.params.orderId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

module.exports = router;