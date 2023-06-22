import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import styles from './Post.module.css'

const Post = () => {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image)
    formData.append('title', title)
    formData.append('content', content)
    blogService.create(formData)
    navigate('/')
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleImageUpload = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
        Image:
          <input type="file" onChange={handleImageUpload} className={styles.imageInput} />
        </label>
        <label>
        Title:
          <input type='text' onChange={handleTitle} className={styles.titleInput}/>
        </label>
        <ReactQuill
          className={styles.quillEditor}
          theme='snow'
          value={content}
          onChange={setContent}
        />
        <button type="submit" className={styles.submitButton}>Post</button>
      </form>
    </div>
  )
}

export default Post
