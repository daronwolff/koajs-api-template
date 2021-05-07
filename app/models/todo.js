const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model('todo', todoSchema);
