const express = require('express')
const GeoJSON = require('geojson')

const Price = require('../models/prices')
const Station = require('../models/stations')
const Metric = require('../models/metrics')

const stats = require('../utils/statistics')

const apiRouter = express.Router()

// Get list of all prices
apiRouter.get('/api/prices', (req, res) => {
  Price.find({}).then(result => {
    res.json(result)
  })
})

// Get prices for fuel type
apiRouter.get('/api/prices/fuel/:fueltype', (req, res) => {
  Price.find({
    fueltype: req.params.fueltype
  }).then(result => {
    res.json(result)
  })
})

// Get list of all stations
apiRouter.get('/api/stations', (req, res) => {
  Station.find({}).then(result => {
    res.json(result)
  })
})

// Get station
apiRouter.get('/api/stations/:stationcode', (req, res) => {
  Station.aggregate(
    [
      {
        $match: { code: req.params.stationcode }
      },
      {
        $lookup: {
          from: 'prices',
          localField: 'code',
          foreignField: 'stationcode',
          as: 'prices'
        }
      }
    ]
  ).then(result => {
    res.json(result[0])
  })
})

// Get fuel price metrics
apiRouter.get('/api/metrics/fuel/:fueltype', (req, res) => {
  let prices, metric

  Price.find({
    fueltype: req.params.fueltype
  }).then(data => {
    prices = data 

    // Get metric from 24 hours ago
    return Metric.find({
      fueltype: req.params.fueltype
    }).sort('-timestamp').limit(24)
  }).then(data => {
    metric = data[23]

    if (prices.length > 0) {
      const average = stats.getAveragePrice(prices)
      const min = stats.getMinPrice(prices)
      const max = stats.getMaxPrice(prices)

      const prevAverage = metric.average
      const prevMin = metric.min
      const prevMax = metric.max
      const prevRange = metric.range

      res.json({
        average,
        min,
        max,
        range: max.price - min.price,
        prevAverage,
        prevMin,
        prevMax,
        prevRange
      })
    } else {
      res.status(500).send('Internal Server Error')
    }
  })
})

// Get fuel price history
apiRouter.get('/api/history/fuel/:fueltype', (req, res) => {
  Metric.find({
    fueltype: req.params.fueltype
  }).then(prices => {
    if (prices && prices.length > 0) {
      const formattedMetrics = prices.map(metric => {
        return {
          ...metric._doc,
          date: new Date(metric.timestamp).toLocaleDateString('en-AU')
        }
      })

      res.json(formattedMetrics)
    } else {
      return res.json()
    }
  })
})

// Get geojson
apiRouter.get('/api/map/geojson', (req, res) => {
  Station.find({})
    .then(result => {
      const stations = result.map(station => {
        return {
          lat: station.lat,
          lng: station.long,
          latitude: station.lat,
          longitude: station.long,
          code: station.code,
          name: station.name,
          address: station.address,
        }
      })

      const json = GeoJSON.parse(stations, { Point: ['lat', 'lng'] })
      res.json(json)
    })
})

module.exports = apiRouter
