import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { useContext } from 'react'
import { UserContext } from '../context/GlobalContext'

const Header = () => {
  const { user } = useContext(UserContext)

  return (
    <header className={styles.header}>
      <div className={styles.icon}><Link className={styles.link} to="/">FullStackHub</Link></div>
      <input className={styles.searchBar} type="text" placeholder="Search..." />
      <nav className={styles.navigation}>
        <Link className={styles.link} to="/">Home</Link>
        <Link className={styles.link} to="/about">About</Link>
        <Link className={styles.link} to="/post">Post</Link>
        <Link className={styles.link} to="/showblogs">Blogs</Link>
        {user === null ?
          <Link className={styles.link} to="/auth">Auth</Link>
          :
          <Link className={styles.link} to="/profile">Profile</Link>
        }
      </nav>
    </header>
  )
}

export default Header
