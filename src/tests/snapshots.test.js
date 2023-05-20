/**
 * @jest-environment jsdom
 */
 import React from 'react'
 import '@testing-library/jest-dom/extend-expect'
 import { fireEvent, render } from '@testing-library/react'
 import fs from 'fs'
import DashboardPage from '../pages/DashboardPage'
import MetricCard from '../components/MetricCard'
import FuelGraph from '../components/FuelGraph'
import StationList from '../components/StationList'
 
 /**
  * Read sample data for testing
  * 
  * @param {String} fileName JSON data filename
  * @returns {Array} an array of like records
  */
 describe("Snapshot Tests", () => {
 

   test('DashboardPage Snapshot', () => {
    const fuelType = "E10" 
    const setFuelType = "95" 
    const metrics = 110.1

    const component = render(
      <DashboardPage fuelType={fuelType} setFuelType={setFuelType} metrics={metrics}/>
    )
    expect(component).toMatchSnapshot()
  })

  test('MetricCard Snapshot', () => {
    const title = "Title" 
    const figure = 120.5 
    const prevFigure = 110.1

    const component = render(
      <MetricCard title={title} figure={figure} prevFigure={prevFigure}/>
    )
    expect(component).toMatchSnapshot()
  })

  test('FuelGraph Snapshot', () => {
    const fuelType = "E10" 
    const data = 120.5 

    const component = render(
      <FuelGraph fuelType={fuelType} data={data}/>
    )
    expect(component).toMatchSnapshot()
  })

  test('StationList Snapshot', () => {
    const stations = "Ready?" 

    const component = render(
      <StationList stations={stations}/>
    )
    expect(component).toMatchSnapshot()
  })

 })
 