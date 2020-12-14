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

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'Email or password was not provided.' });
  }

  const dbUser = await db.User.findOne({ email });

  if (!dbUser)
    return res.status(422).send({ error: 'Email or password is incorrect' });

  try {
    await dbUser.comparePassword(password);
    const token = jwt.sign({ userId: dbUser._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Email or password is incorrect' });
  }
});

module.exports = router;
