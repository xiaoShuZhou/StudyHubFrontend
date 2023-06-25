import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './ShowBlogs.module.css'
import { BlogsContext } from '../context/GlobalContext'
import Pagination from '../components/Pagination'

const ShowBlogs = () => {
  const { blogs, setBlogs } = useContext(BlogsContext)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

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
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={blogs.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default ShowBlogs
