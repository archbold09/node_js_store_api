const express = require('express');

const router = express.Router();

router.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    return res.json({ limit, offset });
  }

  return res.send('Not params avalible');
});

module.exports = router;
