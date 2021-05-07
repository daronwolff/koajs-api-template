/**
 * Generic messages for clients
 */
const INTERNAL_ERROR = 'Internal error server';
const CREATED = 'Element created';
const DELETED = 'Element deleted';
const UPDATED = 'Element updated';
const MISSING_TOKEN = 'Missing authorization token';

module.exports = {
  CREATED,
  DELETED,
  UPDATED,
  INTERNAL_ERROR,
  MISSING_TOKEN,

  ONLY_ALPHABETICAL_TEXT: 'Only alphabetical characters',
  ALPHABETICAL_REGEX: /^[a-zA-Z ]*$/,
};
