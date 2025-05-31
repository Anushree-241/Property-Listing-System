const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { propertyId } = req.body;
  try {
    const favorite = await Favorite.create({
      user: req.user.id,
      property: propertyId,
    });
    res.status(201).json(favorite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate('property');
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:propertyId', auth, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      user: req.user.id,
      property: req.params.propertyId,
    });
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
