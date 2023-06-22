import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './ShowBlogs.module.css'

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage,] = useState(6) // change this to control how many blogs appear per page

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get('/api/blogs')
      setBlogs(response.data)
    }
    fetchBlogs()
  }, [])

  // Logic for displaying page numbers
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(blogs.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <h1 className={styles.heading}>Blogs</h1>
      <div className={styles.container}>
        {currentItems.map(blog => (
          <div key={blog.id} className={styles.block}>
            <img src={blog.imageurl} alt={blog.title} />
            <Link to={`/showblog/${blog.id}`} className={styles.customlink}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.author}</p>
            <p>{new Date(blog.updatedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className={styles.pageNumbers}>
        {pageNumbers.map(num => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={currentPage === num ? styles.active : null}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ShowBlogs
