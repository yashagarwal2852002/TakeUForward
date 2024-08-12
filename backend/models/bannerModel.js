const mongoose = require('mongoose');

// Define the schema
const bannerSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

// Create the model
const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
