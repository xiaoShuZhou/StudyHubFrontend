import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
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
import loginService from './services/login'

import { BlogsContext } from './context/MyContext'
import { UserContext } from './context/MyContext'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/profile')

    } catch (exception) {
      setNotification({
        type: 'error',
        text: 'wrong username or password'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  return (
    <div>
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
            <Route path="/auth" element={<Auth username={username} password={password}
              handleLogin={handleLogin}
              handleNameChange={handleNameChange}
              handlePasswordChange={handlePasswordChange} />} />
            <Route path="/profile"  element={<Profile />} />
          </Routes>
        </BlogsContext.Provider>
      </UserContext.Provider>
      <Footer />
    </div>
  )
}

export default App