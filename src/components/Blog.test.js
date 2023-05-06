import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import Blog from './Blog'

// unfinished
describe('Blog component tests', () => {
  let blog = {
    title:'how to build a react app',
    author:'John',
    url:'www.baidu.com',
    likes:666
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('renders title and author', () => {
    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )
    expect(component.container).toHaveTextContent(
      'how to build a react app'
    )
  })

  test('clicking the view button displays url and number of likes', () => {
    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'www.baidu.com'
    )

    expect(component.container).toHaveTextContent(
      '666'
    )
  })
})
