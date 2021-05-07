module.exports = {
  // created
  CREATED: 201,

  // invalid data sent by client
  CLIENT_SIDE: 400,

  // The 401 (Unauthorized) status code indicates that the request has not been
  // applied because it lacks valid authentication credentials
  // for the target resource.
  // Re 401, see https://tools.ietf.org/html/rfc7235#section-3.1
  MISSING_AUTH: 401,

  // token is invalid
  // The 403 (Forbidden) status code indicates that the server understood
  // the request but refuses to authorize it.
  // Re 403, see https://tools.ietf.org/html/rfc7231#section-6.5.3
  INVALID_TOKEN: 403,

  // Resource not found
  NOT_FOUND: 404,

  // example: duplicated records
  CONFLICT: 409,
};
