import React, { useState, useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/GlobalContext'
import { NotificationContext } from '../context/GlobalContext'
import styles from './Post.module.css'

const Post = () => {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const { user } = useContext(UserContext)
  const { setNotification } = useContext(NotificationContext)

  if (!user) {
    setNotification({
      type: 'info',
      text: 'You need to login to post a blog'
    })
    setTimeout(() => {
      setNotification(null)
    }, 2000)
    navigate('/auth')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!image || !title.trim() || !content.trim()) {
      window.alert('You need to post an image, a title, and content.')
      return
    }

    const formData = new FormData()
    formData.append('image', image)
    formData.append('title', title)
    formData.append('content', content)

    try {
      await blogService.create(formData)
      window.alert('Post successfully!.')
      navigate('/')
    } catch (error) {
      console.error(error)
      window.alert('Something went wrong while posting your blog. Please try again.')
    }
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
