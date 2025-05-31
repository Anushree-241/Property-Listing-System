const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const auth = require('../middleware/auth');
const redisClient = require('../config/redis');

router.post('/', auth, async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      createdBy: req.user.id 
    });
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Property
router.put('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    if (property.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied. Not the owner.' });
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Property
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });

    
    if (property.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied. Not the owner.' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//advance filters

router.get('/',async(req,res)=>{
  try {
    //caching
    const cacheKey = `properties:${JSON.stringify(req.query)}`;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      console.log('Cache hit');
      return res.json(JSON.parse(cached));
    }

    const {
      title,
      type,
      state,
      city,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      amenities,
      furnished,
      listedBy,
      tags,
      isVerified,
      listingType,
      minrating,
      maxrating
    } = req.query;
    const filter = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (type) filter.type = type;
    if (state) filter.state = state;
    if (city) filter.city = city;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    if (bedrooms) filter.bedrooms = parseInt(bedrooms);
    if (bathrooms) filter.bathrooms = parseInt(bathrooms);
    if (furnished) filter.furnished = furnished;
    if (listedBy) filter.listedBy = listedBy;
    if (isVerified) filter.isVerified = isVerified === 'true';
    if (listingType) filter.listingtype = listingType;

    if (amenities) {
      const amenitiesArray = amenities.split(',');
      filter.amenities = { $all: amenitiesArray };
    }

    if (tags) {
      const tagsArray = tags.split(',');
      filter.tages = { $all: tagsArray };
    }

    if(minrating || maxrating){
      filter.rating ={};
      if(minrating) filter.rating.$gte = parseFloat(minrating);
      if(maxrating) filter.rating.$lte = parseFloat(maxrating);

    }

    const properties = await Property.find(filter);
    await redisClient.setEx(cacheKey, 60, JSON.stringify(properties));
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;
