const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');

const mailer = require('../services/mailer');
const authServices = require('../services/auth');
const { usersService } = require('../services');
const io = require('../helpers');
const { jwt } = require('../config');

const {
  REPEATED_EMAIL_ERROR,
  REPEATED_EMAIL_ERROR_MESSAGE,
  SALT_SIZE,
  RESET_PASSWD_MSG,
  RESET_PASSWD_SUBJECT,
  TOKENS_SIZE,
  RESET_PASSWD_TOKEN_ERROR,
  PASSWORDS_DONT_MATCH,
  PASSWORD_UPDATED,
  LOGIN_ERROR_MESSAGE,
  RESET_PASSWD_COMPLETE,
  ACCOUNT_ACTIVATION,
  ACCOUNT_ACTIVATION_ERROR,
  ACCOUNT_ACTIVATION_SUCCESS,
} = require('../constants/auth');
const { CLIENT_SIDE, MISSING_AUTH } = require('../constants/httpStatusCodes');

/**
 * Generates encrypted password
 * @param {string} plainPassword
 * @return {string} hashed password
 */
const generatePassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(SALT_SIZE);
  return await bcrypt.hash(plainPassword, salt);
};


/**
 * Generates random string
 * @param {string} plainPassword
 * @return {string} hashed password
 */
const generateToken = async () => {
  const buffer = await crypto.randomBytes(TOKENS_SIZE);
  const token = buffer.toString('hex');
  return token;
};

const auth = {

  /**
   * Creates a new user account
   * @param {object} ctx object
   */
  create: async (ctx) => {
    const { request: { body } } = ctx;

    try {
      // checking if user already exists
      const emailExist = await authServices.getByEmail(body.email);
      if (emailExist != null) {
        const duplicatedUser = {
          message: REPEATED_EMAIL_ERROR_MESSAGE,
          email: body.email,
        };

        ctx.body = io.httpOut(duplicatedUser, REPEATED_EMAIL_ERROR);
        ctx.status = REPEATED_EMAIL_ERROR;
      } else {
        // Generating hashed password
        const hashedPassword = await generatePassword(body.password);
        body.password = hashedPassword;

        // generating confirmation token
        const confirmationToken = await generateToken();
        body.confirmationToken = confirmationToken;

        // Creating user in db
        const data = await authServices.createAuth(body);

        // Sending confirmation email
        // TODO: use html template
        const text = `Your activation account code is ${confirmationToken}`;
        mailer.sendEmail(body.email, ACCOUNT_ACTIVATION, text);

        const response = io.httpCreated(data._id);
        ctx.status = response.statusCode;
        ctx.body = response;
      }
    } catch (error) {
      return ctx.throw(error);
    }
  },

  /**
   * Login user account. Returns JWT
   * @param {object} ctx object
   */
  login: async (ctx) => {
    const { request: { body } } = ctx;

    try {
      const data = await authServices.getByEmail(body.email);
      const password = body.password;
      const loginErrorMessage = {
        statusCode: MISSING_AUTH,
        message: LOGIN_ERROR_MESSAGE,
        details: [body],
      };

      // if emails is not in database return error
      if (data == null) {
        ctx.status = MISSING_AUTH;
        return ctx.body = loginErrorMessage;
      }

      // Checking if password is valid
      const validatedPassword = bcrypt.compareSync(password, data.password);
      if (!validatedPassword) {
        ctx.status = MISSING_AUTH;
        return ctx.body = loginErrorMessage;
      }

      // setting properties
      const payload = {
        sub: data._id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      };

      // JWT
      const token = jsonwebtoken.sign(payload, jwt.secret, {
        algorithm: 'HS256',
      });

      return (ctx.body = io.httpOut({ id: data._id, token }));
    } catch (error) {
      return ctx.throw(MISSING_AUTH);
    }
  },

  /**
   * Action to start resetting pasword process
   * Sends an email to user including token to change password
   * @param {object} ctx object
   */
  forgotPassword: async (ctx) => {
    const { request: { body: { email } } } = ctx;
    const user = await authServices.getByEmail(email);
    const message = { message: RESET_PASSWD_MSG };

    // if user doesn´t exist finish and send message
    if (user == null) return ctx.body = io.httpOut(message);

    // const buffer = await crypto.randomBytes(TOKENS_SIZE);
    // const token = buffer.toString('hex');
    const token = await generateToken();
    await authServices.setResetPassword(user._id, token);

    const text = `Your reset token is ${token}`; // TODO: use html template
    mailer.sendEmail(email, RESET_PASSWD_SUBJECT, text);
    return ctx.body = io.httpOut(message);
  },

  /**
   * To change the password based on token
   * @param {object} ctx object
   */
  resetPassword: async (ctx) => {
    const { request: { body: { token, password, verifyPassword } } } = ctx;

    // todo: move this to joi validations
    if (password != verifyPassword) {
      ctx.status = CLIENT_SIDE;
      const details = [password, verifyPassword];
      return ctx.body = io.httpErr(details, PASSWORDS_DONT_MATCH, CLIENT_SIDE);
    }

    const userByToken = await authServices.getByToken(token);
    if (userByToken == null) {
      ctx.status = CLIENT_SIDE;
      return ctx.body = io.httpErr([], RESET_PASSWD_TOKEN_ERROR, CLIENT_SIDE);
    }

    // generating new password
    const newPassword = await generatePassword(password);

    // updating password, resetting tokens
    await usersService.resetPasswordByToken(userByToken, newPassword);

    // Notify user via email
    const text = 'Your password was updated'; // TODO: use html template
    await mailer.sendEmail(userByToken.email, RESET_PASSWD_COMPLETE, text);
    return ctx.body = io.httpOut({ message: PASSWORD_UPDATED });
  },

  /**
   * Returns HTML to change password. Validates if token in query param is valid
   * @param {object} ctx object
   */
  resetPasswordView: async (ctx) => {
    const { query } = ctx.request;
    if (!query.token || query.token.length < TOKENS_SIZE) {
      return ctx.body = RESET_PASSWD_TOKEN_ERROR;
    }

    try {
      const validToken = await authServices.getByToken(query.token);
      if (validToken == null) return ctx.body = RESET_PASSWD_TOKEN_ERROR;

      return await ctx.html('views/reset-password.html');
    } catch (error) {
      return ctx.throw(500);
    }
  },

  /**
   * Activates user account by activationCode from payload
   * @param {object} ctx object
   */
  activateAccount: async (ctx) => {
    const { request: { body: { activationCode } } } = ctx;
    try {
      // Geting user by token
      const userByActivationCode = await authServices
        .getByActivationCode(activationCode);

      // If token is invalid return client side error
      if (userByActivationCode == null) {
        ctx.status = CLIENT_SIDE;
        return ctx.body = io.httpErr(
          {activationCode},
          ACCOUNT_ACTIVATION_ERROR,
          CLIENT_SIDE);
      }

      // activating account
      await authServices.activateAccount(userByActivationCode);
      return ctx.body = io.httpOut(ACCOUNT_ACTIVATION_SUCCESS);
    } catch (error) {
      return ctx.throw(500);
    }
  },
};

module.exports = auth;
