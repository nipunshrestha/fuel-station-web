const express = require('express')
const path = require('path')

const appRouter = express.Router()

// Server React app
appRouter.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, '../../build/index.html'), function (err) {
    if (err) {
      response.status(500).send(err)
    }
  })
})

module.exports = appRouter
