// const koaJwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');

const codes = require('../constants/httpStatusCodes');
const messageCodes = require('../constants/clientMessages');
const { jwt: { secret } } = require('../config');
const { usersService } = require('../services');

// middleware for validations
const checkAuth = async (ctx, next) => {
  if (!ctx.headers.authorization) {
    ctx.throw(codes.MISSING_AUTH, messageCodes.MISSING_TOKEN);
  }

  const token = ctx.headers.authorization.split(' ')[1];
  try {
    const verified = jsonwebtoken.verify(token, secret);
    const user = await usersService.getById(verified.sub);
    if (user == null) {
      ctx.throw(codes.INVALID_TOKEN, {});
    }
    ctx.request.session = user;
  } catch (err) {
    ctx.throw(err.status || codes.INVALID_TOKEN, err.text);
  }
  await next();
};

module.exports = {
  checkAuth,
};
