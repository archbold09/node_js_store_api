const express = require('express');

const ProductsSevice = require('../services/productsService');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await ProductsSevice.find();

  res.json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await ProductsSevice.findOne(id);

  if (!product) return res.status(404).json({ message: '404 Not found' });

  return res.status(200).json(product);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await ProductsSevice.create(body);
  res.status(201).json({ message: 'Created', newProduct });
});

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
