'use strict';

const router = require('express').Router();
require('dotenv').load();
const {
  authMiddleware,
} = require('../middlewares');
const {
  Public,
} = require('../models');

router.get('/countries', authMiddleware, async (req, res) => {
  try {
    const utility = new Public();
    const data = await utility.getCountries();

    res.send(data);
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
});

router.get('/currencies', authMiddleware, async (req, res) => {
  try {
    const utility = new Public();
    const data = await utility.getCurrencies();

    res.send(data);
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
});

module.exports = router;