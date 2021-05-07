const rules = require('../helpers/joi/rules');
const constants = require('../constants/auth');

const validationSchemas = {

  create: {
    body: {
      firstName: rules.alphabeticStringRequired
        .min(constants.NAME_MIN)
        .max(constants.NAME_MAX),
      lastName: rules.alphabeticString
        .min(constants.NAME_MIN)
        .max(constants.NAME_MAX),
      middleName: rules.alphabeticString,
      email: rules.emailRequired,
      password: rules.password,
      passwordConfirmation: rules.password_confirmation,
      dob: rules.date,
    },
    type: 'json',
  },

  login: {
    body: {
      email: rules.stringRequired.email(),
      password: rules.stringRequired,
    },
    type: 'json',
  },

  forgotPassword: {
    body: {
      email: rules.emailRequired,
    },
    type: 'json',
  },

  resetPassword: {
    body: {
      password: rules.stringRequired
        .min(constants.PASSWORD_MIN)
        .max(constants.PASSWORD_MAX),
      verifyPassword: rules.stringRequired
        .min(constants.PASSWORD_MIN)
        .max(constants.PASSWORD_MAX),
      token: rules.stringRequired
        .min(constants.RESET_PASSWD_TOKEN_SIZE),
    },
    type: 'json',
  },

  activateAccount: {
    body: {
      activationCode: rules
        .stringRequired
        .max((constants.TOKENS_SIZE * 4)),
    },
    type: 'json',
  },

};

module.exports = validationSchemas;
