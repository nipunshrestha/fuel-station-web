import React from 'react'
import {
  ListGroup,
  Button
} from 'react-bootstrap'
import { formatPrice } from '../utils/Helpers'

import { useHistory } from 'react-router-dom'
import Bookmark from './Bookmark.js'

const StationInfoCard = ({ stationInfo }) => {
  const history = useHistory()

  const stationFuelPrices = stationInfo?.prices?.map((priceData) => {
    return (
      <ListGroup.Item className="px-0" key={priceData._id}>
        {priceData.fueltype}
        <span className="float-end">${formatPrice(priceData.price)}</span>
      </ListGroup.Item>
    )
  })

  return (
    <>
      <div className="station-info-card p-3">
        <div className="bg-white rounded shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold m-0">{stationInfo?.name}</h5>
            <Bookmark station={stationInfo}/>
          </div>
          
          <p className="text-muted small">{stationInfo?.address}</p>

          <ListGroup variant="flush">
            {stationFuelPrices}
          </ListGroup>

          <div className="d-grid mt-3">
            <Button onClick={() => history.push(`/stations/${stationInfo.code}`)} variant="primary">View station</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default StationInfoCard