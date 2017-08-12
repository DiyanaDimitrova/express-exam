const mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required'

let instagramSchema = mongoose.Schema({
  description: {
    type: String,
    required: requiredValidationMessage,
    maxlength: 500
  },
  url: {
    type: String,
    required: requiredValidationMessage
  },
  likes: [{
      type: String
    }],
  views: {
    type: Number,
    default: 1
  },
  tags: {
    hashTags: [{
      type: String,
      unique: true
    }],
    userTags: [{
      type: String
    }]
  },
  date: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('Instagram', instagramSchema)
