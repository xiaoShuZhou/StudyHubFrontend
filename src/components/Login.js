import React, { useContext, useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { UserContext, NotificationContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext)
  const { setNotification } = useContext(NotificationContext)

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
      }, 2000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            placeholder='username'
            className={styles.inputField}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            placeholder='password'
            className={styles.inputField}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
