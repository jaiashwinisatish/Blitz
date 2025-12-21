const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  expertise: [{
    type: String
  }],
  bio: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=Developer&background=6366f1&color=fff'
  },
  email: {
    type: String,
    required: true
  },
  github: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  portfolio: {
    type: String,
    default: ''
  },
  yearsOfExperience: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Developer', developerSchema);
