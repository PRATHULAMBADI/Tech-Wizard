const mongoose = require('mongoose');

const { Schema } = mongoose;

const bootcampWorkshopProgramSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  conductingPerson: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  registrationLink: {
    type: String,
    required: true,
  },
  otherLinks: {
    website: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BootcampWorkshopOrganizer',
    required: true,
  },
});

const BootcampWorkshopProgram = mongoose.model('BootcampWorkshopProgram', bootcampWorkshopProgramSchema);

module.exports = BootcampWorkshopProgram;
