import React from 'react'
import styles from './Pagination.module.css'

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={styles.pageNumbers}>
      {pageNumbers.map(num => (
        <button
          key={num}
          onClick={() => paginate(num)}
          className={currentPage === num ? styles.active : null}
        >
          {num}
        </button>
      ))}
    </div>
  )
}

export default Pagination
