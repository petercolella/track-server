const express = require('express');
const db = require('../models');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  const tracks = await db.Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: 'Name or locations was not provided.' });
  }

  try {
    const dbTrack = await db.Track.create({
      userId: req.user._id,
      name,
      locations
    });
    res.send(dbTrack);
  } catch (err) {
    res.status(422).res.send({ error: err.message });
  }
});

module.exports = router;
