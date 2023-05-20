const mongoose = require('mongoose')

const metricSchema = new mongoose.Schema({
  fueltype: String,
  average: Number,
  min: Number,
  max: Number,
  range: Number,
  timestamp: Date,
})

metricSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Metric = mongoose.model('Metric', metricSchema)

module.exports = Metric