const rules = require('../helpers/joi/rules');
const constants = require('../constants/userLimits');

const devices = require('../constants/deviceTypes');

const validationSchemas = {
  create: {
    body: {
      min: rules.numberRequired.min(constants.MIN_MIN_VALUE),
      max: rules.numberRequired.max(constants.MAX_MAX_VALUE),

      // todo: use references
      deviceTypeId: rules.string.equal(devices.DEFAULT_DEVICE_TYPE),
    },
    type: 'json',
  },

  delete: {
    params: { id: rules.objectIdRequired },
  },
};

module.exports = validationSchemas;
