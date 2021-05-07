const userController = require('../controllers/users');
const userValidations = require('../validations/users');

const BASE_URL = '/v1';
const usersRoutes = [
  {
    method: 'get',
    path: `${BASE_URL}/profile`,
    handler: userController.get,
  },

  {
    method: 'put',
    path: `${BASE_URL}/profile`,
    validate: userValidations.update,
    handler: userController.update,
  },
];

module.exports = usersRoutes;
