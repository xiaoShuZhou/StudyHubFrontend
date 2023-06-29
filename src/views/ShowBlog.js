import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './ShowBlog.module.css'
import { UserContext } from '../context/GlobalContext'
import blogService from '../services/blogs'

const ShowBlog = () => {
  const [blog, setBlog] = useState(null)
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      const blogData = await blogService.getOne(id)
      setBlog(blogData)
    }
    fetchBlog()
  }, [id])

  if (!blog) return null

  const handleDelete = async () => {
    const confirmation = window.confirm('Do you want to delete the blog?')
    if(confirmation) {
      try {
        await blogService.setToken(user.token)
        await blogService.deleteBlog(blog)
        navigate('/showblogs') // Redirect to the blogs list after deletion
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleEdit = () => {
    navigate(`/editblog/${blog.id}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={blog.imageurl} alt={blog.title} />
      </div>

      <h2 className={styles.title}>{blog.title}</h2>
      <p className={styles.author}>Author: {blog.author}</p>
      <p className={styles.updatedAt}>Last updated: {new Date(blog.updatedAt).toLocaleString()}</p>
      {user && user.name === blog.author &&
        <div className={styles.buttonContainer}>
          <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
          <button onClick={handleEdit} className={styles.editButton}>Edit</button>
        </div>
      }
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  )
}

export default ShowBlog
