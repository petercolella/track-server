const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/signup', (req, res) => {
  console.log(req.body);
  res.send('/signup post route');
});

module.exports = router;
