const Koa = require('koa');
const Router = require('koa-joi-router');
const body = require('koa-json-body');
const logging = require('@kasa/koa-logging');
const htmlRender = require('koa-html-render');
const mongoose = require('mongoose');


// loading app libraries
const jwtValidations = require('./middlewares/jwt');
const config = require('./config');
const logger = require('./logger');
const errorHandler = require('./middlewares/errorHandler');

// connecting db
mongoose.connect(config.connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  mongoose.set('debug', true);
});

// declarations
const routes = require('./routes');
const app = new Koa();
const PORT = config.port;

// setting middlewares
app.use(body({ limit: '10kb', fallback: true }));
app.use(logging({ logger, overrideSerializers: false }));
app.use(errorHandler);
app.use(htmlRender());

// Protected routes
const secureRouter = new Router();
secureRouter.use(jwtValidations.checkAuth);
secureRouter.route(routes.protected);
app.use(secureRouter.middleware());

// Public routes
const publicRouter = new Router();
publicRouter.route(routes.public);
app.use(publicRouter.middleware());

app.context.api = true;

const WELCOME_MESSAGE = `Server listening on port: ${PORT}`;
const server = app.listen(PORT, () => console.log(WELCOME_MESSAGE));

/**
 * Stop function is used in the integration tests
 */
function stop() {
  server.close();
}

module.exports = server;
module.exports.stop = stop;
