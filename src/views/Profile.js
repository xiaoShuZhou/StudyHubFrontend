import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './ShowBlogs.module.css'
import { UserContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'

const Profile = () => {
  const { user, setUser } = useContext(UserContext)
  const [userBlogs, setUserBlogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      const fetchUserBlogs = async () => {
        const response = await axios.get(`/api/blogs/user/${user.id}`)
        setUserBlogs(response.data)
      }
      fetchUserBlogs()
    }
  }, [user])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = userBlogs.slice(indexOfFirstItem, indexOfLastItem)

  const handleLogout = () => {
    const confirmation = window.confirm('Do you want to logout?')
    if(confirmation) {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
      navigate('/')
    }
  }


  return (
    <div>
      <h1 className={styles.heading}>{user ? `${user.name}'s Blogs` : 'Not Logged In'}</h1>
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
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
        totalItems={userBlogs.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default Profile
