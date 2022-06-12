const express = require('express');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  createProductSchema,
  editProductSchema,
  getProductSchema,
} = require('../utils/schemas/productsSchema');

const ProductsSevice = require('../services/productsService');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await ProductsSevice.find();

  res.json(products);
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await ProductsSevice.findOne(id);
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const newProduct = await ProductsSevice.create(body);
      return res.status(201).json({ message: 'Created', newProduct });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await ProductsSevice.update(id, body);

    res.json({ message: 'Updated', product });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await ProductsSevice.delete(id);
  res.json({ message: 'Deleted', response });
});

module.exports = router;
