const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');
const auth = require('../middleware/auth');


router.post('/', auth, async (req, res) => {
  const { recipientEmail, propertyId } = req.body;

  try {
    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    recipient.recommendationsReceived.push({
      property: property._id,
      recommendedBy: req.user.id,
    });

    await recipient.save();

    res.status(200).json({ message: 'Property recommended successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//get all recieved recommendations
router.get('/received', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'recommendationsReceived.property',
      })
      .populate({
        path: 'recommendationsReceived.recommendedBy',
        select: 'email',
      });

    res.json(user.recommendationsReceived);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
