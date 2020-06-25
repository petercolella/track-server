const express = require('express');
const db = require('../models');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  const tracks = await db.Track.find({ userId: req.user._id });

  res.send(tracks);
});

module.exports = router;
