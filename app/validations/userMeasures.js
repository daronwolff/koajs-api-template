const rules = require('../helpers/joi/rules');

const { MIN_VALUE, MAX_VALUE } = require('../constants/userMeasures');

const validationSchema = {
  get: {
    params: {
      id: rules.objectIdRequired,
    },
  },

  create: {
    body: rules.arrayOrObject(rules.object({
      value: rules.numberRequired.min(MIN_VALUE).max(MAX_VALUE),
      type: rules.id,
      date: rules.dateRequired,
    })),
    type: 'json',
  },
};

module.exports = validationSchema;
