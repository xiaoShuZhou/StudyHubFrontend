import React from 'react'

const Notification = ({ notification }) => {
  console.log('Notification: ', notification)
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.text}
    </div>
  )
}

export default Notification
