
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'daronwolff app',
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 7070,
  },
  production: {
    jwt: {
      // eslint-disable-next-line
      secret: process.env.ACCESS_TOKEN_SECRET || 'v3pMOTT6chgOo1LpVqyxyU$wjRHm896wgyWoSq7ClqpSoUyICIi2',
      expiresIn: process.env.ACCESS_TOKEN_LIFE || 120,
    },
    port: process.env.APP_PORT || 7071,
  },
  development: {
    jwt: {
      // eslint-disable-next-line
      secret: process.env.ACCESS_TOKEN_SECRET || 'jBK7mNETjl&%83%H1cFqVt6Ewrr#CX8RU7waM$8z2TxLOJ2js8lg325',
      expiresIn: process.env.ACCESS_TOKEN_LIFE || 360,
    },
    port: process.env.APP_PORT || 3000,
    connectionString: 'mongodb://localhost:27017/mydbname',

    // Basic mailer uses sendgrid
    mailer: {
      host: process.env.MAILER_HOST || 'localhost',
      port: process.env.MAILER_HOST || 25,
      secure: process.env.MAILER_SECURE || false,
      from: process.env.MAILER_FROM || 'demo@dopmain.com',
      auth: {
        user: process.env.MAILER_USER || 'apikey',
        // eslint-disable-next-line
        pass: process.env.MAILER_PASS || 'SG.h4t59v_5Sve5b1O',
      },
    },
  },
  test: {
    port: process.env.APP_PORT || 7072,
  },
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
