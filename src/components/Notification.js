import React from 'react'
import styles from './Notification.module.css'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={`${styles.notification} ${styles[notification.type]}`}>
      {notification.text}
    </div>
  )
}

export default Notification
