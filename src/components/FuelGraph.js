import React from 'react'
import { LineChart, 
  Line,
  CartesianGrid,
  XAxis, 
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import {Card} from 'react-bootstrap'

const FuelGraph = ({data, fuelType}) =>{
  return (

    <Card className="border-0 shadow-sm">
      <Card.Body>
        <span className="d-block text-uppercase fw-bold text-black-50 small mb-3">Average {fuelType.name} Price</span>
        <ResponsiveContainer aspect={3}>    
          <LineChart data={data}>
            <Line type="monotone" dataKey="average" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip/>
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  )
}
export default FuelGraph