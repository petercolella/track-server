const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const dbModel = await db.User.create(req.body);
    const token = jwt.sign({ userId: dbModel._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
