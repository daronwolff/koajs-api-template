const mongoose = require('mongoose');

const { Schema } = mongoose;
const { MODEL_NAME: USERS_MODEL } = require('../constants/users');


const authSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  middleName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  isConfirmed: {
    type: Boolean,
    required: false,
    default: 0,
  },
  confirmationToken: {
    type: String,
    requiried: false,
    trim: true,
  },
  confirmedAt: {
    type: Date,
    required: false,
    default: null,
  },
  resetPasswordToken: {
    type: String,
    required: false,
    trim: true,
  },
  resetPasswordExpires: {
    type: Date,
    required: false,
  },

},
{
  timestamps: true,
});

module.exports = mongoose.model(USERS_MODEL, authSchema);
