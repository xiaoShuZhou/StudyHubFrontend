import React, { useState } from 'react'

const Blog = ({ blog,handleLike, handleDeleteBlog, loggedUser }) => {

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(blog)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} <button id='like' onClick={handleLike}>like</button></p>
        <p>Added by {blog.user.username}</p>
        {loggedUser === blog.user.username ?
          <button id='delete' onClick={handleDeleteBlog}>delete</button>
          : null}
      </div>
    </div>
  )
}
export default Blog