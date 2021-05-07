/*
 * Controller example. Todo List
*/
const todoController = require('../controllers/todo');
const todoValidations = require('../validations/todo');

const BASE_URL = '/v1/todos';
const todoRoutes = [
  {
    method: 'get',
    path: BASE_URL,
    handler: todoController.list,
  },
  {
    method: 'get',
    path: `${BASE_URL}/:id`,
    validate: todoValidations.get,
    handler: todoController.get,
  },
  {
    method: 'put',
    path: `${BASE_URL}/:id`,
    validate: todoValidations.update,
    handler: todoController.update,
  },
  {
    method: 'delete',
    path: `${BASE_URL}/:id`,
    validate: todoValidations.delete,
    handler: todoController.delete,
  },
  {
    method: 'post',
    path: BASE_URL,
    validate: todoValidations.create,
    handler: todoController.create,
  },
];

module.exports = todoRoutes;
