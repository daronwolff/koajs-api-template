const Todo = require('../models/todo');

module.exports = () => ({
  getAll: async () => (await Todo.find()),

  getById: async (id) => (await Todo.findById(id)),

  deleteTodo: async (id) => (await Todo.findByIdAndRemove(id)),

  createTodo: async (body) => (await new Todo(body).save()),

  updateTodo: async (id, body) => (await Todo.findByIdAndUpdate(id, body)),
});
