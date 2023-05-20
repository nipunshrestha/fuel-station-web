import React,{useEffect,useState} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import Bookmark from '../components/Bookmark'
import {
  Row,
  Container,
  Col,
  ListGroup
} from 'react-bootstrap'

// Components
import StationListItem from '../components/StationListItem'
  
export default function ProfilePage() {
  const { user } = useAuth0()
  const bookmarks = useSelector(state => state)
  const [, setbook] = useState(bookmarks)

  useEffect(() => {
    setbook(bookmarks)
  }, [bookmarks])  

  const stationListItems = bookmarks.fuelStations?.map((station) => {
    return (
      <>
        <Row>
          <Col md="10">
            <StationListItem key={station.code} station={station} />
          </Col>
          <Col>
            {station && <Bookmark station={station} />}
          </Col>
        </Row>
      </>
    )
  })
    
  return (
    <>
      <Container className="py-4">
        <Row>
          <Col md="auto">
            <h1 className="fw-bold mb-3">Welcome</h1>
          </Col>
          <Col>
            <h3 className="mb-3 mt-2">{user?.name}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="mb-3">Bookmarks</h2>
          </Col> 
        </Row>
        <Row>
          <ListGroup as="div" variant="flush">
            {stationListItems}
          </ListGroup>
        </Row>             
      </Container >
    </>
  )
}
