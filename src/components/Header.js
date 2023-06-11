import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.icon}><Link className={styles.link} to="/">FullStackHub</Link></div>
      <input className={styles.searchBar} type="text" placeholder="Search..." />
      <nav className={styles.navigation}>
        <Link className={styles.link} to="/">Home</Link>
        <Link className={styles.link} to="/about">About</Link>
        <Link className={styles.link} to="/posts">Posts</Link>
        <Link className={styles.link} to="/blogs">Blogs</Link>
        <Link className={styles.link} to="/login">Login</Link>
      </nav>
    </header>
  )
}

export default Header
