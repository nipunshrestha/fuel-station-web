import React from 'react'
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { useHistory } from 'react-router-dom'

const Navigation = ({ stations }) => {
  const { SearchBar } = Search
  const history = useHistory()

  const handleClick = (station) => {
    history.push(`/stations/${station.code}`)
  }

  const columns = [
    {
      dataField: 'code',
      text: 'Station Code',
      sort: true
    },
    {
      dataField: 'brand',
      text: 'Brand',
      sort: true
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true
    },
    {
      dataField: 'address',
      text: 'Address'
    },
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: (cellContent, station) => (
        <Button size="sm" onClick={() => handleClick(station)}>
          View
        </Button>
      )
    },
  ]

  return (
    <>
      <Container className="py-4">
        <Row>
          <Col>
            <ToolkitProvider
              bootstrap4={true}
              keyField='id'
              data={stations}
              columns={columns}
              search
            >
              {
                props => (
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h2 className="fw-bold">Stations</h2>
                      <SearchBar {...props.searchProps} srText="" />
                    </div>

                    <BootstrapTable
                      wrapperClasses="bg-white p-3 rounded shadow-sm mb-4"
                      bordered={false}
                      pagination={paginationFactory({
                        sizePerPage: 20
                      })}
                      {...props.baseProps}
                    />
                  </>
                )
              }
            </ToolkitProvider>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Navigation