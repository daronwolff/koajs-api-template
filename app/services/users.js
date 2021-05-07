const User = require('../models/users');

module.exports = {
  // Updates user information
  updateInformation: async (id, body) =>
    await User.updateOne({ _id: id }, body),
};
