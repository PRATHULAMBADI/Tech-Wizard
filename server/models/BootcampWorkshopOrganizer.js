const mongoose = require('mongoose');

const { Schema } = mongoose;

const bootcampWorkshopOrganizerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  organization: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
 },
  {
    timestamps: true,
  }
);

const BootcampWorkshopOrganizer = mongoose.model('BootcampWorkshopOrganizer', bootcampWorkshopOrganizerSchema);

module.exports = BootcampWorkshopOrganizer;

