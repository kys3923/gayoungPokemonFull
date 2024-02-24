const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {timestamps: true})

UserSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
}, {timestamps: true})

UserSchema.methods.matchPasswords = async function(password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

UserSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex')

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000 )

  return resetToken
}

const User = mongoose.model('User', UserSchema)

module.exports = User