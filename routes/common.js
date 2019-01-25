'use strict';

const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const mkdirp = require('mkdirp');
require('dotenv').load();
const {
  authMiddleware,
} = require('../middlewares');
const {
  Public,
} = require('../models');
const { BadRequestError } = require('../exceptions');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `uploads/${moment.utc().format('YYYYMMDD')}/`;
    mkdirp(dir, err => cb(err, dir));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // TODO: make filesize limit configurable
  },
}).single('image');

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

router.post(
  '/upload',
  authMiddleware,
  function (req, res) {
    upload(req, res, function (err) {
      try {
        if (err) {
          throw new BadRequestError(
            err.message
          );
        }

        res.send(req.file);
      } catch (err) {
        res.status(err.statusCode).send(err);
      }
    });
  });

module.exports = router;