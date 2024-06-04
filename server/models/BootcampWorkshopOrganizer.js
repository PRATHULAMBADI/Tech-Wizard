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
  phone:{
    type: Number,
    required: true,
    minlength: 10,
    validate: {
      validator: function(value) {
        return value.toString().length === 10;
      },
      message: 'Mobile number must be 10 digits long.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(value) {
        return value.length >= 8;
      },
      message: 'Password must be at least 8 characters long.'
    }
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

