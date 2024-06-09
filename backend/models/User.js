const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  mobilenumverification: {
    type: Boolean,
    default: false,
  },
  kycverification: {
    type: String,
    default: "false",
  },
  kycsubmission: {
    type: String,
    default: "false",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Specify the collection name 'kkk'
const User = mongoose.model('UserCred', UserSchema);

module.exports = User;
