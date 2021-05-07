/*
 * Validations for /profile
 */
const rules = require('../helpers/joi/rules');
const constants = require('../constants/auth');

const validationSchemas = {
  update: {
    body: rules
      .object({
        firstName: rules.alphabeticString
          .min(constants.NAME_MIN)
          .max(constants.NAME_MAX),
        lastName: rules.alphabeticString
          .min(constants.NAME_MIN)
          .max(constants.NAME_MAX),
        middleName: rules.alphabeticString,
        dob: rules.date,
      })
      .min(1),
    type: 'json',
  },
};

module.exports = validationSchemas;
