const express = require('express')

const User = require('../models/users')

const userRouter = express.Router()

// Get user and saved station
userRouter.get('/api/user/:id', (req, res) => {
  User.findOne({
    email: req.params.id
  }).then(result => {
    res.json(result)
  })
})

userRouter.post('/api/user/add/:id', async(req, res) => {
  try {
    const user = await User.findOne({ email: req.params.id })
    const {fuelStation} = req.body
    if (user) {
      user.fuelStations = user.fuelStations.concat(fuelStation)
      await user.save()
      return res.json('Added fuel station')
    } else {
      const newUser = new User({
        email: req.params.id,
        name: req.body.name,
        fuelStations: [fuelStation],
      })
      await newUser
        .save()
        .then(() => res.json('new user added'))
        .catch((err) => res.status(400).json('Error' + err))
    }
  } catch (error) {
    res.status(401).json('Error' + error)
  }
})

userRouter.delete('/api/user/delete/:id', async(req, res) => {
  try {
    const data = req.params.id.split('-')
    const user = await User.findOne({email: data[0] })
    if (user) {
      user.fuelStations = user.fuelStations.filter(station => station.code != data[1])
      await user
        .save()
        .then(() => res.json('Deleted fuel station'))
    }
  } catch (error) {
    res.status(400).json('Error' + error)
  }
})

module.exports = userRouter