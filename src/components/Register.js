import React, { useContext, useState } from 'react'
import userService from '../services/user'
import { UserContext, NotificationContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'
import styles from './Register.module.css'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { setUser } = useContext(UserContext)
  const { setNotification } = useContext(NotificationContext)

  const handleRegister = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setNotification({
        type: 'error',
        text: 'Passwords do not match'
      })
      setTimeout(() => {
        setNotification(null)
      }, 2000)
      return
    }
    try {
      const newUser = await userService.register({
        name, username, password
      })
      setUser(newUser)
      setName('')
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      navigate('/')
    } catch (exception) {
      setNotification({
        type: 'error',
        text: 'Failed to create account'
      })
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            value={name}
            name="Name"
            onChange={handleNameChange}
            placeholder='name for blogs'
            className={styles.inputField}
          />
        </div>
        <div>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            placeholder='username for auth'
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
        <div>
          <input
            type="password"
            value={confirmPassword}
            name="ConfirmPassword"
            onChange={handleConfirmPasswordChange}
            placeholder='confirm password'
            className={styles.inputField}
          />
        </div>
        <button type="submit" className={styles.button}>register</button>
      </form>
    </div>
  )
}

export default Register
