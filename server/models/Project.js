const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  fullDescription: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile App', 'AI/ML', 'Blockchain', 'Desktop App', 'Game Development', 'Other']
  },
  techStack: [{
    type: String
  }],
  features: [{
    type: String
  }],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'
  },
  demoImages: [{
    type: String
  }],
  demoVideo: {
    type: String,
    default: ''
  },
  downloadLink: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  purchaseCount: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
