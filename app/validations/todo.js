/*
 * Validations for /todos
*/
const rules = require('../helpers/joi/rules');
const constants = require('../constants/todos');

const validationSchemas = {
  list: () => ({
    query: {
      id: rules.id,
    },
  }),

  get: {
    params: {
      id: rules.objectId,
    },
  },

  create: {
    body: {
      name: rules
        .stringRequired
        .min(constants.NAME_MIN)
        .max(constants.NAME_MAX),
      desc: rules.string
        .min(constants.DESC_MIN)
        .max(constants.DESC_MAX),
    },
    type: 'json',
  },

  update: {
    params: {
      id: rules.objectId,
    },
    body: rules.object({
      name: rules
        .string
        .min(constants.NAME_MIN)
        .max(constants.NAME_MAX),
      desc: rules.string
        .min(constants.DESC_MIN)
        .max(constants.DESC_MAX),
    }).min(1),
    type: 'json',

  },
  delete: {
    params: {
      id: rules.objectId,
    },
  },
};

module.exports = validationSchemas;
