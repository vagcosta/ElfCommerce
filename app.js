'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uniqid = require('uniqid');
const randomstring = require('randomstring');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const moment = require('moment');
require('dotenv').load();
const {
  OAuth2Request,
  User,
  Store,
  StoreSummary,
  Product,
  ProductAttribute,
  Order,
  Category,
  Public,
  Supplier,
  Manufacturer,
} = require('./models');
const { UnauthorisedError } = require('./exceptions');

const { tokenSecret } = process.env;
const app = express();
app.use(cors());
app.use(bodyParser.json());


// TODO: added middleware to verify storeId for all endpoints 

const authMiddleware = async (req, res, next) => {
  // This should be replaced by key-value pair storage like memcache
  // or redis when traffic increased
  try {
    if (!req.headers.authorization) {
      throw new UnauthorisedError('Unauthorised request.');
    }
    const auth = new OAuth2Request();
    const res = await auth.validateToken(
      req.headers.authorization
    );
    next();
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
};

const userCodeVerifier = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      tokenSecret
    );

    if (!decoded || decoded.data.accountId !== req.params.accountId) {
      throw new UnauthorisedError('Invalid user ID.');
    }
    res.locals.auth = decoded.data;
    next();
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
};

const storeIdVerifier = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      tokenSecret
    );

    if (!decoded || decoded.data.storeId !== req.params.storeId) {
      throw new UnauthorisedError('Invalid store ID');
    }

    res.locals.auth = decoded.data;
    next();
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
};

// public APIs
app.get('/countries', authMiddleware, async (req, res) => {
  try {
    const utility = new Public();
    const data = await utility.getCountries();

    res.send(data);
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
});

app.get('/currencies', authMiddleware, async (req, res) => {
  try {
    const utility = new Public();
    const data = await utility.getCurrencies();

    res.send(data);
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
});

app.post('/auth', async (req, res) => {
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

app.post('/accounts', async (req, res) => {
  try {
    const salt = randomstring.generate(32);
    const user = new User(
      uniqid(),
      req.body.name,
      req.body.email,
      md5(`${req.body.password + salt}`),
      salt
    );
    const data = await user.add(user);

    res.send(data);
  } catch (err) {
    res.status(err.statusCode).send(err);
  }
});

app.get(
  '/accounts/:accountId',
  [authMiddleware, userCodeVerifier],
  async (req, res) => {
    try {
      const user = new User();
      const data = await user.get(req.params.accountId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

app.get(
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

app.put(
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

app.post(
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

app.get(
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

app.get(
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

app.put(
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

app.delete(
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

app.get(
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

app.post(
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

app.get(
  '/stores/:storeId/products/:productId/attributes',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const aroductAttribute = new ProductAttribute();
      const data = await aroductAttribute.getAllByProductId(req.params.productId);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

app.post(
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

app.get(
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

app.get(
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

app.put(
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

app.post(
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
        shortid.generate(),
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

app.delete(
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

app.get(
  '/stores/:storeId/categories',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const category = new Category();
      const data = await category.getAllByStoreId(req.params.storeId, req.query.page || 1, req.query.size || 20);
      const count = await category.getTotalCountByStoreId(req.params.storeId);

      res.send({ data, count });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

app.post(
  '/stores/:storeId/categories',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const {
        name,
        parentId,
      } = req.body;
      const category = new Category(
        shortid.generate(),
        name,
        req.params.storeId,
        res.locals.auth.accountId,
        parentId,
      );
      const data = await category.add(category);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

app.put(
  '/stores/:storeId/categories/:categoryId',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const {
        name,
        parentId,
      } = req.body;
      const category = new Category(
        req.params.categoryId,
        name,
        req.params.storeId,
        res.locals.auth.accountId,
        parentId,
      );
      const data = await category.update(category);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

app.get(
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

app.delete(
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

app.get(
  '/stores/:storeId/manufacturers',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const manufacturer = new Manufacturer();
      const data = await manufacturer.getAllByStoreId(req.params.storeId);
      const count = await manufacturer.getTotalCountByStoreId(req.params.storeId);

      res.send({ data, count });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

app.post(
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
        res.locals.auth.accountId
      );
      const data = await manufacturer.add(manufacturer);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

app.get(
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

app.put(
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

app.delete(
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

app.get(
  '/stores/:storeId/suppliers',
  [authMiddleware, storeIdVerifier],
  async (req, res) => {
    try {
      const supplier = new Supplier();
      const data = await supplier.getAllByStoreId(req.params.storeId, req.query.page || 1, req.query.size || 20);
      const count = await supplier.getTotalCountByStoreId(req.params.storeId);

      res.send({ data, count });
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

app.post(
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
        res.locals.auth.accountId
      );
      const data = await supplier.add(supplier);

      res.send(data);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  }
);

app.get(
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

app.put(
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

app.delete(
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

module.exports = app;
