import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import styles from './ShowBlog.module.css'

const ShowBlog = () => {
  const [blog, setBlog] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(`/api/blogs/${id}`)
      setBlog(response.data)
    }
    fetchBlog()
  }, [id])

  if (!blog) return null

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={blog.imageurl} alt={blog.title} />
      </div>
      <h2 className={styles.title}>{blog.title}</h2>
      <p className={styles.author}>Author: {blog.author}</p>
      <p className={styles.updatedAt}>Last updated: {new Date(blog.updatedAt).toLocaleString()}</p>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: blog.content }}></div>
    </div>
  )
}

export default ShowBlog
