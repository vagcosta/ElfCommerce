'use strict';

const router = require('express').Router();
const shortid = require('shortid');
require('dotenv').load();
const { authMiddleware, storeIdVerifier } = require('../middlewares');
const { Category } = require('../models');
const { UnauthorisedError } = require('../exceptions');

router.get(
  '/stores/:storeId/categories',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const category = new Category();
      const data = await category.getAllByStoreId(
        req.params.storeId,
        req.query.page || 1,
        req.query.size || 20,
        req.query.activeOnly ? true : false
      );
      const count = await category.getTotalCountByStoreId(
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
  '/stores/:storeId/categories',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const { name, parentId } = req.body;
      const category = new Category(
        shortid.generate(),
        name,
        req.params.storeId,
        res.locals.auth.accountId,
        parentId ? 2 : 1,
        parentId,
        true
      );
      const data = await category.add(category);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.put(
  '/stores/:storeId/categories/:categoryId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const { name, parentId } = req.body;
      const category = new Category(
        req.params.categoryId,
        name,
        req.params.storeId,
        res.locals.auth.accountId,
        req.params.categoryId === parentId ? 1 : 2,
        parentId
      );

      const data = await category.update(category);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.get(
  '/stores/:storeId/categories/:categoryId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const category = new Category();
      const data = await category.get(req.params.categoryId);

      if (data.storeId !== req.params.storeId) {
        throw new UnauthorisedError('Invalid category ID.');
      }

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.patch(
  '/stores/:storeId/categories/:categoryId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const category = new Category();
      const data = await category.activate(req.params.categoryId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

router.delete(
  '/stores/:storeId/categories/:categoryId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const category = new Category();
      const data = await category.delete(req.params.categoryId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

module.exports = router;
