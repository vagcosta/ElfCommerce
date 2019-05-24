'use strict';

const router = require('express').Router();
const shortid = require('shortid');
const moment = require('moment');
require('dotenv').load();
const {
  authMiddleware,
  storeIdVerifier,
} = require('../middlewares');
const {
  Product,
  ProductAttribute,
} = require('../models');
const { UnauthorisedError } = require('../exceptions');

router.get(
  '/stores/:storeId/products/:productId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const product = new Product();
      const data = await product.get(req.params.productId);

      if (data.storeId !== req.params.storeId) {
        throw new UnauthorisedError('Invalid product ID.');
      }

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.put(
  '/stores/:storeId/products/:productId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const {
        name,
        categoryId,
        sku,
        description,
        quantity,
        allowQuantity,
        unitPrice,
        cost,
        coverImage,
      } = req.body;
      const product = new Product(
        req.params.productId,
        name,
        categoryId,
        req.params.storeId,
        sku,
        description,
        quantity,
        allowQuantity,
        null,
        res.locals.auth.accountId,
        unitPrice,
        cost,
        coverImage
      );

      const data = await product.update(product);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.patch(
  '/stores/:storeId/products/:productId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const product = new Product();
      const data = await product.activate(req.params.productId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.delete(
  '/stores/:storeId/products/:productId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const product = new Product();
      const data = await product.delete(req.params.productId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.get(
  '/stores/:storeId/products',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const product = new Product();
      /* Check if it's a search call, only code, name and sku fields allowed
         for product search atm
      */
      const data = await product.getAllByStoreId(
        req.params.storeId,
        req.query.page || 1,
        req.query.size || 20,
        req.query.q || null
      );
      const count = await product.getTotalCountByStoreId(req.params.storeId, req.query.q || null);

      res.send({ data, count });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.post(
  '/stores/:storeId/products',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const {
        name,
        categoryId,
        sku,
        description,
        quantity,
        allowQuantity,
        unitPrice,
        cost,
        coverImage,
        supplierId,
        manufacturerId,
      } = req.body;

      const product = new Product(
        shortid.generate(),
        name,
        categoryId,
        req.params.storeId,
        sku,
        description,
        quantity,
        allowQuantity,
        moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        res.locals.auth.accountId,
        unitPrice,
        cost,
        coverImage,
        manufacturerId,
        supplierId,
      );
      const data = await product.add(product);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.get(
  '/stores/:storeId/products/:productId/attributes',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const aroductAttribute = new ProductAttribute();
      const data = await aroductAttribute.getAllByProductId(req.params.productId);

      res.send(data);
    } catch (err) {
      console.log(err)
      res.status(err.statusCode).send(err);
    }
  }
);

router.post(
  '/stores/:storeId/products/:productId/attributes',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const {
        name,
        quantity,
        varPrice,
        productAttributeCategoryId,
      } = req.body;
      const aroductAttribute = new ProductAttribute(
        shortid.generate(),
        name,
        req.params.productId,
        quantity,
        varPrice,
        moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        res.locals.auth.accountId,
        productAttributeCategoryId
      );
      const data = await aroductAttribute.add(aroductAttribute);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.put(
  '/stores/:storeId/products/:productId/attributes/:attributeId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const {
        name,
        quantity,
        varPrice,
        productAttributeCategoryId,
      } = req.body;
      const aroductAttribute = new ProductAttribute(
        req.params.attributeId,
        name,
        req.params.productId,
        quantity,
        varPrice,
        null,
        res.locals.auth.accountId,
        productAttributeCategoryId
      );
      const data = await aroductAttribute.update(aroductAttribute);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.delete(
  '/stores/:storeId/products/:productId/attributes/:attributeId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const attr = new ProductAttribute();
      const data = await attr.delete(req.params.attributeId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.patch(
  '/stores/:storeId/products/:productId/attributes/:attributeId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const attr = new ProductAttribute();
      const data = await attr.activate(req.params.attributeId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

module.exports = router;