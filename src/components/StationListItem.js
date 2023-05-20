import React from 'react'
import {
  ListGroup
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const StationListItem = ({ station }) => {
  const history = useHistory()

  const handleClick = (e) => {
    e.preventDefault()
    history.push(`/stations/${station.code}`)
  }

  return (
    <>
      <ListGroup.Item as="a" href="#" onClick={(e) => handleClick(e)} className="d-flex justify-content-between align-items-start bg-transparent text-dark border-bottom border-grey">
        <div className="ms-2 me-auto">
          <div className="fw-bold">{station.name}</div>
          <span className="small text-muted">{station.address}</span>
        </div>
      </ListGroup.Item>
    </>
  )
}

export default StationListItem