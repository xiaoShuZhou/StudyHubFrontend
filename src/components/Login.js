import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserNameContext } from '../context/AuthContext'
import { PassWordContext } from '../context/AuthContext'
import { UserContext } from '../context/GlobalContext'
import { NotificationContext } from '../context/GlobalContext'

const LoginForm = () => {
  const navigate = useNavigate()
  const { username, setUsername } = useContext(UserNameContext)
  const { password, setPassword } = useContext(PassWordContext)
  const {  setUser } = useContext(UserContext)
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
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleNameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm