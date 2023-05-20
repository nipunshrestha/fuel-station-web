import { Dropdown } from 'react-bootstrap'

const FuelDropdown = ({ fuelType, handleDropdownChange }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="text" id="fuelSelect">
        <b>Fuel:</b> {fuelType?.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleDropdownChange('E10', 'E10')}>E10</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownChange('U91', 'Unleaded 91')}>91</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownChange('P95', 'Premium 95')}>95</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownChange('P98', 'Premium 98')}>98</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownChange('DL', 'Diesel')}>Diesel</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownChange('PDL', 'Premium Diesel')}>Premium Diesel</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDropdownChange('LPG', 'LPG')}>LPG</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default FuelDropdown