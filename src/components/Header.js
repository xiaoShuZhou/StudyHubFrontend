import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { UserContext } from '../context/GlobalContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const { user } = useContext(UserContext)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (event) => {
    event.preventDefault()
    navigate(`/search?query=${searchQuery}`)
  }

  return (
    <header className={styles.header}>
      <div className={styles.icon}><Link className={styles.link} to="/">FullStackHub</Link></div>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.searchButton} type="submit"><FontAwesomeIcon icon={faSearch} /></button>
      </form>
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
