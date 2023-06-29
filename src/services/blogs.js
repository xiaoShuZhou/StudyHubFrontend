import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = async id => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

// const like = async blog => {
//   const config = {
//     headers: { Authorization: token },
//   }
//   const request = await axios.put(`${baseUrl}/${blog.id}`, { ...blog, likes: blog.likes + 1 }, config)
//   return request.data
// }

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.data
}



export default { getAll, create, setToken,  deleteBlog, getOne, update }