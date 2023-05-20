import React from 'react'
import { Marker } from 'react-map-gl'
import { GeoAltFill } from 'react-bootstrap-icons'

export default function Pin({ markers, setPopupMarkerInfo, changeViewport, viewport }) {
  const handleOnclick = (station) => {
    changeViewport({
      ...viewport,
      longitude: station.long,
      latitude: station.lat,
      zoom: 15,
      transitionDuration: 1000
    })
  }

  return (
    (markers) ?
      (markers.fuelStations.map(station => (
        <Marker
          key={station.code}
          longitude={station.long}
          latitude={station.lat}
          onClick={() => handleOnclick(station)}
          offsetLeft={-15}
          offsetTop={-30}
        >
          <GeoAltFill className="text-danger" size="30px" onMouseEnter={() => setPopupMarkerInfo(station)} />
        </Marker>)))
      : null

  )
}
