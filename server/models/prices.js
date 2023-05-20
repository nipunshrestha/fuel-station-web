const mongoose = require('mongoose')

const priceSchema = new mongoose.Schema({
  stationcode: String,
  state: String,
  fueltype: String,
  price: Number,
  lastupdated: Date,
})

priceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Price = mongoose.model('Price', priceSchema)

module.exports = Price