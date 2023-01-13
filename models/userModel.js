import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },

    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Please add an password'],
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String
    },

    otpExpiry: {
      type: Date
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
