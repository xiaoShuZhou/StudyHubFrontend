import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  // const [likes, setLikes] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleLike = async (blog) => {
    const likedBlog = await blogService.like(blog)
    setBlogs(
      blogs.map(blog =>
        blog.id === likedBlog.id
          ? { ...blog, likes: likedBlog.likes }
          : blog
      )
    )
  }
  // const handleAddBlog = async (event) => {
  //   event.preventDefault()
  //   const blogObject = {
  //     title: title,
  //     author: author,
  //     url: url,
  //     likes: likes
  //   }
  //   const returnedBlog = await blogService.create(blogObject)
  //   setBlogs(blogs.concat(returnedBlog))
  //   setTitle('')
  //   setAuthor('')
  //   setUrl('')
  //   setLikes('')
  //   setNotification({
  //     type: 'success',
  //     text: `a new blog ${title} by ${author} added`
  //   })
  //   setTimeout(() => {
  //     setNotification(null)
  //   }, 5000)
  // }
  const handleAddBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    returnedBlog.user = {
      username: user.username,
      name: user.name
    }
    setBlogs(blogs.concat(returnedBlog))
    setNotification({
      type: 'success',
      text: `a new blog ${blogObject.title} by ${blogObject.author} added`
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog)
      setBlogs(
        blogs.filter(currenetBlog => currenetBlog.id !== blog.id)
      )
    }
  }


  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        <LoginForm username={username} password={password}
          handleLogin={handleLogin}
          handleNameChange={handleNameChange}
          handlePasswordChange={handlePasswordChange} />
        :
        <div>
          <Togglable buttonLabel='new blog'>
            <AddBlogForm
              handleAddBlog={handleAddBlog}
            />
          </Togglable>
          <div>
            <p>{user.name} logged-in </p>
            <button onClick={handleLogout} type="submit">logout</button>
            <h2>blogs</h2>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} handleDeleteBlog = {() => handleDeleteBlog(blog)} loggedUser = {user.username}/>
            )}
          </div>
        </div>}
    </div>
  )
}

export default App