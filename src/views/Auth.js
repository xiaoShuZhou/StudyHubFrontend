import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import styles from './Auth.module.css'

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <p className={styles.switchText}>
        {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
        <a href="#" onClick={() => setIsRegister(!isRegister)} className={styles.switchLink}>
          {isRegister ? ' Login' : ' Register'}
        </a>
      </p>
    </div>
  )
}

export default Auth
