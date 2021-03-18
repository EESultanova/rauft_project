const mongoose = require('mongoose')

// 0 — admin
// 1 — user
// 2 - candidate
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  login: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
    min: 6,
  },
  role: {
    type: Number,
    default: 2
  },
  date_of_birth: {
    type: Date,
  },
  education: {
    type: String
  },
  industry: {
    type: String
  },
  hobby: {
    type: String
  },
  favorite_music: {
    type: String
  },
  favorite_artwork: {
    type: String
  },
  favorite_book: {
    type: String
  },
  favorite_movie: {
    type: String
  },
  favorite_cousine: {
    type: String
  },
  favorite_car_brand: {
    type: String
  },
  favorite_place: {
    type: String
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
