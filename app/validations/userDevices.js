const rules = require('../helpers/joi/rules');
const { MIN_SERIAL, MAX_SERIAL } = require('../constants/userDevices');

const validationSchema = {
  create: {
    body: {
      serial: rules.stringRequired.min(MIN_SERIAL).max(MAX_SERIAL),
      type: rules.id,
    },
    type: 'json',
  },
};

module.exports = validationSchema;
