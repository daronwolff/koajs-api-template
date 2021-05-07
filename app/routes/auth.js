const authController = require('../controllers/auth');
const authValidations = require('../validations/auth');

const BASE_URL = '/v1/auth';
const authRoutes = [

  {
    method: 'post',
    path: `${BASE_URL}/register`,
    validate: authValidations.create,
    handler: authController.create,
  },

  {
    method: 'post',
    path: `${BASE_URL}/login`,
    validate: authValidations.login,
    handler: authController.login,
  },

  {
    method: 'post',
    path: `${BASE_URL}/forgot-password`,
    validate: authValidations.forgotPassword,
    handler: authController.forgotPassword,
  },

  {
    method: 'get',
    path: `${BASE_URL}/reset-password`,
    handler: authController.resetPasswordView,
  },

  {
    method: 'post',
    path: `${BASE_URL}/reset-password`,
    validate: authValidations.resetPassword,
    handler: authController.resetPassword,
  },

  {
    method: 'post',
    path: `${BASE_URL}/activate-account`,
    validate: authValidations.activateAccount,
    handler: authController.activateAccount,
  },

  {
    method: 'post',
    path: '/',
    handler: (ctx) => {
      ctx.body = {};
    },
  },

];

module.exports = authRoutes;
