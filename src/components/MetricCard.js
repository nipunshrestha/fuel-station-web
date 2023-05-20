import React from 'react'
import {
  Card,
  Badge
} from 'react-bootstrap'
import { formatPrice } from '../utils/Helpers'

const MetricCard = ({ title, figure, prevFigure }) => {
  const MetricBadge = () => {
    const percentageChange = ((prevFigure - figure)/prevFigure).toFixed(3)
    if (!figure || !prevFigure) {
      return <></>
    }

    return (
      <Badge bg={figure === prevFigure ? 'info' : figure < prevFigure ? 'warning' : 'success'}>
        {figure === prevFigure && 
          <span>{percentageChange}% Δ</span>
        }

        {figure < prevFigure && 
          <span>↑ {percentageChange}% Δ</span>
        }

        {figure > prevFigure && 
          <span>↓ {percentageChange}% Δ</span>
        }
      </Badge>
    )
  }

  return (
    <>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div className="">
              <span className="d-block text-uppercase fw-bold text-black-50 small">{title}</span>
              <span className="d-block h3 text-uppercase fw-bold pt-3 pb-0">${formatPrice(figure)}</span>
            </div>
            <div className="">
              <MetricBadge />
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default MetricCard