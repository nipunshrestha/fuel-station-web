import React, { useState, useEffect } from 'react'
import {
  // BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import stationService from './services/stations'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'

//Customisation
import './sass/App.scss'

// Components
import Navigation from './components/Navigation'
import StationTable from './components/StationTable'

// Reducers
import { initializeBookmarks } from './reducers/userReducer'

// Pages
import DashboardPage from './pages/DashboardPage'
import GraphPage from './pages/GraphPage'
import StationInfoPage from './pages/StationInfoPage'
import ProfilePage from './pages/ProfilePage'
import MapPage from './pages/MapPage'

function App() {
  const [stations, setStations] = useState([])
  const [metrics, setMetrics] = useState()
  const [fuelType, setFuelType] = useState({
    type: 'E10',
    name: 'E10'
  })

  const { user, isAuthenticated } = useAuth0()
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(initializeBookmarks(user.email))
    }     
  }, [user])

  useEffect(() => {
    stationService.getStations()
      .then(response => {
        setStations([...response])
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    stationService.getMetric(fuelType.type)
      .then(response => {
        setMetrics(response)
      })
      .catch(error => {
        console.error(error)
      })
  }, [fuelType])

  return (
    <>
      <Navigation />
      <Switch>
          
        <Route path="/map">
          <MapPage stations={stations} />
        </Route>

        <Route path="/profile">
          <ProfilePage />
        </Route>

        <Route path="/stations/:code">
          <StationInfoPage stations={stations} />
        </Route>
        <Route path="/stations">
          <StationTable stations={stations} />
        </Route>
        
        <Route path="/trends">
          <GraphPage fuelType={fuelType} setFuelType={setFuelType} />   
        </Route>

        <Route path="/">
          <DashboardPage fuelType={fuelType} setFuelType={setFuelType} metrics={metrics} />
        </Route>
        
      </Switch>
    </>
  )
}

export default App
