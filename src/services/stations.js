import axios from 'axios'

const baseUrl = '/api'

const getStations = () => {
  const request = axios.get(`${baseUrl}/stations`)
  return request.then(response => response.data)
}

const getStation = (stationCode) => {
  const request = axios.get(`${baseUrl}/stations/${stationCode}`)
  return request.then(response => response.data)
}

const getMetric = (fuelType) => {
  const request = axios.get(`${baseUrl}/metrics/fuel/${fuelType}`)
  return request.then(response => response.data)
}

const getHistory = (fuelType) => {
  const request = axios.get(`${baseUrl}/history/fuel/${fuelType}`)
  return request.then(response => response.data)
}

const service = {getStations, getStation, getMetric, getHistory}
export default service