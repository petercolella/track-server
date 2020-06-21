const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/signup', (req, res) => {
  db.User.create(req.body)
    .then(dbModel => res.send(dbModel))
    .catch(err => res.send(err));
});

module.exports = router;
