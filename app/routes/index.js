// private routes
const todoRoutes = require('./todo');


// public routes
const authRoutes = require('./auth');

const routes = {
  protected: [
    ...todoRoutes,
  ],

  public: [...authRoutes],
};

module.exports = routes;
