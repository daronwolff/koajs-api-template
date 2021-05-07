const handler = require('../helpers');

/**
 * generates error response for server errors
 * @link https://stackoverflow.com/questions/37009352/how-to-handle-a-404-in-koa-2
 * @param {oject} ctx
 * @param {function} next
 */
const koaErrorHandler = async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    const message = err.message;

    const errorDetails = err.details || [];

    const statusCode = err.status;
    ctx.status = statusCode || 500;

    const errorResponse = handler.httpErr(errorDetails, message, statusCode);
    ctx.body = errorResponse;
    ctx.app.emit('error', err, ctx);
  }
};

module.exports = koaErrorHandler;
