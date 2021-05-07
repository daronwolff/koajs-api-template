const {
  INTERNAL_ERROR,
  CREATED,
  DELETED,
  UPDATED,
} = require('../constants/clientMessages');

const handler = {
  // success response
  httpOut: (data, statusCode = 200) => ({
    statusCode,
    data,
  }),

  // record created
  httpCreated: (id) => ({
    _id: id,
    statusCode: 201,
    message: CREATED,
  }),

  // record modified
  httpModified: (removed = false) => ({
    statusCode: 200,
    message: (removed) ? DELETED : UPDATED,
  }),

  // errors
  httpErr: (errorDetails = [], message = INTERNAL_ERROR, statusCode = 500) => {
    return ({
      statusCode,
      message,
      errorDetails,
    });
  },
};

module.exports = handler;
