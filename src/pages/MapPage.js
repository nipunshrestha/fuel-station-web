import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

// Services
import stationService from '../services/stations'

// Components
import MapContainer from '../components/MapContainer'
import StationList from '../components/StationList'
import StationInfoCard from '../components/StationInfoCard'

const MapPage = () => {
  const location = useLocation()
  const {isAuthenticated } = useAuth0()
  const [markers, setMarkers] = useState()
  const [visibleStations, setVisibleStations] = useState()
  const [stationInfo, setStationInfo] = useState()

  const bookmarks = useSelector(state => state)

  useEffect(() => {
    if (isAuthenticated) { 
      setMarkers(bookmarks)
    }
  }, [bookmarks])

  const changeStationInfo = (code) => {
    if (stationInfo?.code == code) return

    stationService.getStation(code)
      .then(response => {
        setStationInfo(response)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      <Container className="g-0 full-height" fluid>
        <Row className="g-0 full-height">
          <Col className="full-height overflow-scroll" md="3" xl="2">
            <StationList stations={visibleStations} />
          </Col>
          <Col>
            {stationInfo &&
              <StationInfoCard stationInfo={stationInfo} />
            }
            <MapContainer initialLocation={location?.state} markers={markers} setVisibleStations={setVisibleStations} changeStationInfo={changeStationInfo} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MapPage