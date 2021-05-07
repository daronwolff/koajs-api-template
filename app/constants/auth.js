
module.exports = {
  NAME_MAX: 50,
  NAME_MIN: 1,

  PASSWORD_MAX: 255,
  PASSWORD_MIN: 5,

  REPEATED_EMAIL_ERROR_MESSAGE: 'Email is already in use',
  REPEATED_EMAIL_ERROR: 409,

  SALT_SIZE: 10,
  MODEL_NAME: 'users',

  TOKENS_SIZE: 20,
  RESET_PASSWD_TOKEN_ERROR: 'Password reset token is invalid or has expired',
  RESET_PASSWD_MSG: 'if account exists an email will be sent',
  RESET_PASSWD_TOKEN_EXPIRE: 86400000,
  RESET_PASSWD_SUBJECT: 'Reset your password',
  RESET_PASSWD_COMPLETE: 'Password account was changed',

  PASSWORDS_DONT_MATCH: 'Password do not match',
  PASSWORD_UPDATED: 'Password updated',

  ACCOUNT_ACTIVATION: 'Activate your  account',
  ACCOUNT_ACTIVATION_SUCCESS: 'Activation complete',
  ACCOUNT_ACTIVATION_ERROR: 'Activation code is invalid or has expired',
  LOGIN_ERROR_MESSAGE: 'Invalid email or password',
};
