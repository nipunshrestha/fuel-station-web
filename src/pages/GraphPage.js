import React, { useState, useEffect } from 'react'
import {
  Row,
  Container,
  Col,
} from 'react-bootstrap'
import stationService from '../services/stations'
import FuelDropdown from '../components/FuelDropdown'


import FuelGraph from '../components/FuelGraph'
const GraphPage = ({ fuelType, setFuelType }) => {
  const [fuelData, setFuelData] = useState()

  useEffect(() => {
    stationService.getHistory(fuelType.type)
      .then(response => {
        setFuelData(response)
      })
      .catch(error => {
        console.error(error)
      })
  }, [fuelType])

  const handleFuelChange = (type, name) => {
    setFuelType({ type, name })
  }

  return (
    <Container className="main-graph py-4">
      <Row>
        <Col>
          <h2 className="fw-bold mb-4">Fuel Trends</h2>
        </Col>
        <Col md="auto">
          <FuelDropdown fuelType={fuelType} handleDropdownChange={handleFuelChange} />
        </Col>
      </Row>
      <Row>
        <FuelGraph data={fuelData} fuelType={fuelType} />
      </Row>
    </Container>
  )

}

export default GraphPage