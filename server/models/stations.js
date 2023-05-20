const mongoose = require('mongoose')

const stationSchema = new mongoose.Schema({
  brandid: String,
  stationid: String,
  brand: String,
  code: String,
  name: String,
  address: String,
  lat: Number,
  long: Number,
  state: String,
})

stationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Station = mongoose.model('Station', stationSchema)

module.exports = Station