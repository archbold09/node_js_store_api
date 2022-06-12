const express = require('express');

const router = express.Router();

router.get('/categories/:idCategory/products/:idProduct', (req, res) => {
  const { idProduct, idCategory } = req.params;

  res.json({ idProduct, idCategory });
});

module.exports = router;
