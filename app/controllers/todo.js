const io = require('../helpers');
const todoServices = require('../services/todo');

//
// "Todo" Controller. Demo
//
const TodoController = {
  list: async (ctx) => {
    const data = await todoServices().getAll();
    ctx.body = io.httpOut(data);
  },

  get: async (ctx) => {
    const { params: { id } } = ctx;
    const data = await todoServices().getById(id);
    if (data) {
      return ctx.body = io.httpOut(data);
    }
    return ctx.throw(404);
  },

  create: async (ctx) => {
    const { request: { body } } = ctx;
    try {
      const data = await todoServices().createTodo(body);
      const response = io.httpCreated(data._id);
      ctx.body = response;
      ctx.status = response.statusCode;
    } catch (error) {
      return ctx.throw(500);
    }
  },

  update: async (ctx) => {
    const { params: { id }, request: { body } } = ctx;
    const updated = await todoServices().updateTodo(id, body);
    if (updated === null) {
      ctx.throw(404);
    }
    ctx.body = io.httpModified();
  },

  delete: async (ctx) => {
    const { params: { id } } = ctx;
    const deleted = await todoServices().deleteTodo(id);
    if (deleted === null) {
      ctx.throw(404);
    }
    ctx.body = io.httpModified(true);
  },

};

module.exports = TodoController;
