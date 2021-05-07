const { RESET_PASSWD_TOKEN_EXPIRE } = require('../constants/auth');
const Users = require('../models/users');

module.exports = {
  // Create new user
  createAuth: async (body) => await new Users(body).save(),

  // Get user by email: To check if user exists
  getByEmail: async (email) => await Users.findOne({ email }),

  // Get user by Id
  getById: async (id) =>
    await Users.findById(id, {
      __v: 0,
      password: 0,
    }),

  // Set reset password and expiration
  setResetPassword: async (id, resetPasswordToken) => {
    const payload = {
      resetPasswordToken,
      resetPasswordExpires: Date.now() + RESET_PASSWD_TOKEN_EXPIRE,
    };
    return await Users.findByIdAndUpdate(id, payload);
  },

  // Get user information based on reset password token
  getByToken: async (resetPasswordToken) => {
    const condition = {
      resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    };
    const fieldsToOmit = { password: 0, devices: 0, measures: 0 };
    return await Users.findOne(condition, fieldsToOmit);
  },

  // Sets a new password and reset the token and expiry token
  resetPasswordByToken: async (user, newPassword) => {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.password = newPassword;
    return await user.save();
  },

  // get by activation code
  getByActivationCode: async (confirmationToken) => await Users
    .findOne({ confirmationToken }, { email: 1}),

  // Activates the account and resets the auth token
  activateAccount: async (user) => {
    user.confirmationToken = undefined;
    user.confirmedAt = Date.now();
    user.isConfirmed = true;
    return await user.save();
  },
};
