import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import { Map } from 'react-bootstrap-icons'

// Services
import stationService from '../services/stations'

// Components
import MetricCard from '../components/MetricCard'
import Bookmark from '../components/Bookmark'

const StationInfoPage = () => {
  const [station, setStation] = useState()
  const { code } = useParams()

  useEffect(() => {
    stationService.getStation(code)
      .then(response => {
        setStation(response)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const getDirections = () => {
    const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(station.address)}`
    window.open(directionsLink, '_blank').focus()
  }

  const stationFuelPrices = station?.prices?.map((priceData) => {
    return (
      <Col lg="3" className="mb-3" key={priceData._id}>
        <MetricCard title={priceData.fueltype} figure={priceData.price} />
      </Col>
    )
  })

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h3 className="fw-bold m-0">{station?.name}</h3>
        </Col>
        <Col md="auto">
          <div className="d-flex justify-content-center align-items-center">
            <Button onClick={() => getDirections()}>
              <Map className="me-2" />
              Directions
            </Button>
            {station && <Bookmark station={station} />}
          </div>
        </Col>
      </Row>
      <Row>
        <p className="text-muted mb-4">{station?.address}</p>
      </Row>
      <Row>
        {stationFuelPrices}
      </Row>
    </Container>
  )
}

export default StationInfoPage