const mongoose = require('mongoose');

const { Schema } = mongoose;

const bootcampWorkshopUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
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
    BootcampWorkshopProgram: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BootcampWorkshopProgram', 
      },
    ],
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    lastLoginDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const BootcampWorkshopUser = mongoose.model('BootcampWorkshopUser', bootcampWorkshopUserSchema);

module.exports = BootcampWorkshopUser;