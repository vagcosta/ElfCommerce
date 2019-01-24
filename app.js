'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').load();
const {
  auth,
  store,
  common,
  product,
  order,
  category,
  supplier,
  manufacturer,
} = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', [
  auth,
  store,
  common,
  product,
  order,
  category,
  supplier,
  manufacturer,
]);

module.exports = app;
