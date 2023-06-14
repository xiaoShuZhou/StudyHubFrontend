// Register.js
import styles from '../views/Auth.module.css'

const Register = () => {

  const handleRegister = () => {
    // handle register logic here
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Username"
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Password"
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Confirm Password"
      />
      <button className={styles.button} onClick={handleRegister}>
        Register
      </button>
    </div>
  )
}

export default Register
