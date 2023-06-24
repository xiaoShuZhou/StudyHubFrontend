import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from './ShowBlogs.module.css'
import { UserContext } from '../context/MyContext'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const {  user, setUser } = useContext(UserContext)
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    navigate('/')
  }

  return (
    <div>
      <h1 className={styles.heading}>{user ? `${user.username}'s Blogs` : 'Not Logged In'}</h1>
      <div className={styles.container}>
        {userBlogs.map(blog => (
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
      <button onClick={ handleLogout }>Logout</button>
    </div>
  )
}

export default Profile
