import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

const Post= () => {
  const [image, setImage] = useState(null)

  const onImageChange = event => {
    setImage(event.target.files[0])
  }

  const onSubmit = async event => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('file', image)
    blogService.postImage(formData)
  }


  return (
    <form onSubmit={onSubmit}>
      <input type="file" name="image" onChange={onImageChange} />
      <button type="submit">Upload</button>
    </form>
  )
}

export default Post