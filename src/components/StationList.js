import React from 'react'
import {
  ListGroup
} from 'react-bootstrap'

import StationListItem from './StationListItem'

const StationList = ({ stations }) => {
  if (!stations || stations?.length > 500) {
    return (
      <div className="text-center py-5">
        <p className="fw-bold mb-2">Too many stations to view</p>
        <p className="text-muted small">Zoom in to view stations</p>
      </div>
    )
  }

  const stationListItems = stations?.map((station) => {
    return (
      <StationListItem key={station.code} station={station} />
    )
  })

  return (
    <>
      <ListGroup as="div" variant="flush">
        {stationListItems}
      </ListGroup>
    </>
  )
}

export default StationList