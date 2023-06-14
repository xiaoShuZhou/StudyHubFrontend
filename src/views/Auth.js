// Auth.js
import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const Auth = (props) => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div>
      {isRegister ? <Register /> : <Login {...props}/>}
      <p>
        {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
        <a href="#" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? ' Login' : ' Register'}
        </a>
      </p>
    </div>
  )
}

export default Auth
