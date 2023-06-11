import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>All rights reserved @ Sean Zhou 2023</div>
      <div>Zhouxinyuan0118@outlook.com</div>
      <div>
        <a href="https://github.com/xiaoShuZhou" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className={styles.icon} icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/sean-zhou-b9689a256/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className={styles.icon} icon={faLinkedin} />
        </a>
      </div>
    </footer>
  )
}

export default Footer