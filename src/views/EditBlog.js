// EditBlog.js
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import blogService from '../services/blogs'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './Post.module.css'

const EditBlog = () => {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchBlog = async () => {
      const blogData = await blogService.getOne(id)
      setTitle(blogData.title)
      setContent(blogData.content)
    }
    fetchBlog()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      window.alert('You need to update the title, and content.')
      return
    }

    const formData = new FormData()
    if (image) formData.append('image', image)
    formData.append('title', title)
    formData.append('content', content)

    try {
      await blogService.update(id, formData)
      window.alert('Post updated successfully!.')
      navigate('/showblogs')
    } catch (error) {
      console.error(error)
      window.alert('Something went wrong while updating your blog. Please try again.')
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
          <input type='text' value={title} onChange={handleTitle} className={styles.titleInput}/>
        </label>
        <ReactQuill
          className={styles.quillEditor}
          theme='snow'
          value={content}
          onChange={setContent}
        />
        <button type="submit" className={styles.submitButton}>Update</button>
      </form>
    </div>
  )
}

export default EditBlog
