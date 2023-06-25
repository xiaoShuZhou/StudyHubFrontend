import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Home from './views/Home'
import About from './views/About'
import ShowBlogs from './views/ShowBlogs'
import ShowBlog from './views/ShowBlog'
import Post from './views/Post'
import Auth from './views/Auth'
import Profile from './views/Profile'

import Header from './components/Header'
import Footer from './components/Footer'
import Notification from './components/Notification'

import blogService from './services/blogs'

import { BlogsContext } from './context/GlobalContext'
import { UserContext } from './context/GlobalContext'
import { NotificationContext } from './context/GlobalContext'


const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  return (
    <div>
      <NotificationContext.Provider value={{ notification, setNotification }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Notification notification={notification} />
          <Header/>
          <BlogsContext.Provider value={{ blogs,setBlogs } }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/showblogs" element={<ShowBlogs />} />
              <Route path="/showblog/:id" element={<ShowBlog />} />
              <Route path="/post" element={<Post />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile"  element={<Profile />} />
            </Routes>
          </BlogsContext.Provider>
        </UserContext.Provider>
      </NotificationContext.Provider>
      <Footer />
    </div>
  )
}

export default App