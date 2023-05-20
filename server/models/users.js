const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  fuelStations: Array,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User