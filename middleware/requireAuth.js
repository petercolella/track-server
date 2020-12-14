const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const db = require('../models');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'Not Authorized.' });
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'Authorization Error' });
    }

    const { userId } = payload;
    const dbModel = await db.User.findById(userId);
    req.user = dbModel;
    next();
  });
};
