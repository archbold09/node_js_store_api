const express = require('express');
const productRouter = require('./productsRoute');
const usersRouter = require('./usersRoute');
const categoriesRouter = require('./categoriesRoute');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
