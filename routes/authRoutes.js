const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/signup', async (req, res) => {
  try {
    const dbModel = await db.User.create(req.body);
    res.send(dbModel);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
