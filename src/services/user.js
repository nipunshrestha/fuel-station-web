import axios from 'axios'

const baseUrl = '/api/user'

const getUser = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


const addNew = (place) => {
  const request = axios.post(`${baseUrl}/add/${place.email}`, place)
  return request.then(response => response.data)
}


const deletePlace = ({ email, id }) => {
  const request = axios.delete(`${baseUrl}/delete/${email}-${id}`)
  return request.then(response => response.data)
}

const userService = {getUser,addNew, deletePlace}
export default userService
