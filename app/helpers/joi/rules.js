const { PASSWORD_MIN, PASSWORD_MAX } = require('../../constants/auth');
const {
  ONLY_ALPHABETICAL_TEXT,
  ALPHABETICAL_REGEX,
} = require('../../constants/clientMessages');

// Rules
const { Joi } = require('koa-joi-router');

Joi.objectId = require('joi-objectid')(Joi);
const rules = {
  alphabeticString: Joi.string()
    .regex(ALPHABETICAL_REGEX, ONLY_ALPHABETICAL_TEXT),
  alphabeticStringRequired: Joi.string()
    .regex(ALPHABETICAL_REGEX, ONLY_ALPHABETICAL_TEXT).required(),

  any: Joi.any(),

  boolean: Joi.boolean(),
  booleanRequired: Joi.boolean().required(),

  // TODO: implement format validation here
  date: Joi.date(),
  dateRequired: Joi.date().required(),

  decimal: Joi.number().precision(2),
  decimalRequired: Joi.number().precision(2).required(),

  email: Joi.string().email(),
  emailRequired: Joi.string().email().required(),

  guid: Joi.string().guid(),
  guidRequired: Joi.string().guid().required(),

  id: Joi.number().integer().min(1),
  idRequired: Joi.number().integer().min(1).required(),

  object: Joi.object,
  objectId: Joi.objectId(),
  objectIdRequired: Joi.objectId().required(),

  password_confirmation: Joi.any().valid(Joi.ref('password')).required(),
  password: Joi.string().min(PASSWORD_MIN).max(PASSWORD_MAX).required(),

  string: Joi.string(),
  stringRequired: Joi.string().required(),

  number: Joi.number(),
  numberRequired: Joi.number().required(),

  arrayOrObject: (joiObjValidations) => Joi.alternatives()
    .try(
      Joi.array().items(joiObjValidations).min(1), joiObjValidations
    ),
};

module.exports = rules;
