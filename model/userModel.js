const mongoose = require('mongoose');
const joi = require('joi')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


function validateUser(user) {
  const schema = joi.object({
      username: joi.string().min(3).max(100).required(),
      email: joi.string().min(5).max(255).required().email(),
      password: joi.string().min(8).max(100).required()
  })
  return schema.validate(user)
}


const User = mongoose.model('User', userSchema);

module.exports = { User, validateUser };