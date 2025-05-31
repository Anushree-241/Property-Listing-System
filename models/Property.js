const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },         
  title: String,                                              
  type: String,                                               
  price: Number,                                              
  state: String,
  city: String,
  areaSqFt: Number,                                           
  bedrooms: Number,
  bathrooms: Number,
  amenities: String,                                        
  furnished: String,                                          
  availableFrom: Date,                                        
  listedBy: String,                                           
  tags: String,                                             
  colorTheme: String,                                         
  rating: Number,                                             
  isVerified: Boolean,
  listingType: String,                                        
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
