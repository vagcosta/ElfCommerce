'use strict';

const router = require('express').Router();
require('dotenv').load();
const {
  OAuth2Request,
} = require('../models');

router.post('/auth', async (req, res) => {
  try {
    let data = null;
    if (!req.body.refreshToken) {
      const auth = new OAuth2Request();
      if (req.body.grantType === 'password') {

        //TODO: Check for req.body.scope
        data = await auth.authByPassword(
          req.body.username,
          req.body.password,
        );
      }
      res.send(data);
    } else {
      const auth = new OAuth2Request();
      data = await auth.refreshToken(req.body.refreshToken);
      res.send(data);
    }
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
});

module.exports = router;