const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  recommendationsReceived: [
    {
      property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
      recommendedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      recommendedAt: { type: Date, default: Date.now },
    },
  ]
});

module.exports = mongoose.model('User', userSchema);

