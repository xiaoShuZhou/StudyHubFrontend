// Auth.js
import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import { UserNameContext } from '../context/AuthContext'
import { PassWordContext } from '../context/AuthContext'

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <UserNameContext.Provider value={{ username, setUsername }}>
      <PassWordContext.Provider value={{ password, setPassword }}>
        <div>
          {isRegister ? <Register /> : <Login />}
          <p>
            {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
            <a href="#" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? ' Login' : ' Register'}
            </a>
          </p>
        </div>
      </PassWordContext.Provider>
    </UserNameContext.Provider>
  )
}

export default Auth
