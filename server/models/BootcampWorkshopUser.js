const mongoose = require('mongoose');

const { Schema } = mongoose;

const bootcampWorkshopUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
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

bootcampWorkshopUserSchema.pre('save', async function (next) {
  if (!this.isModified('mobile') && !this.isModified('password')) {
    // Validation is not necessary if mobile and password haven't changed
    return next();
  }

  const mobileLengthValid = this.mobile.toString().length === 10;
  const passwordLengthValid = this.password.length >= 8;

  if (!mobileLengthValid || !passwordLengthValid) {
    const err = new Error('Validation failed');
    err.errors = {
      mobile: mobileLengthValid ? undefined : 'Mobile number must be 10 digits long.',
      password: passwordLengthValid ? undefined : 'Password must be at least 8 characters long.'
    };
    return next(err);
  }

  // If validation passes, continue with save
  next();
});

const BootcampWorkshopUser = mongoose.model('BootcampWorkshopUser', bootcampWorkshopUserSchema);

module.exports = BootcampWorkshopUser;
