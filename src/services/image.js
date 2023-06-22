import axios from 'axios'
const baseUrl = '/api/images'

const postImage = async newImage => {
  const request = await axios.post(baseUrl, newImage)
  return request.data
}

export default { postImage }