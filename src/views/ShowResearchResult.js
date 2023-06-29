import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import styles from './ShowBlogs.module.css'
import Pagination from '../components/Pagination'

const ShowResearchResult = () => {
  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem)

  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('query')

  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.get(`/api/search?query=${searchQuery}`)
      setResults(response.data)
    }
    fetchResults()
  }, [searchQuery])

  return (
    <div>
      <h1 className={styles.heading}>Search Results</h1>
      <div className={styles.container}>
        {currentItems.map(result => (
          <div key={result.id} className={styles.block}>
            <img src={result.imageurl} alt={result.title} />
            <Link to={`/showblog/${result.id}`} className={styles.customlink}>
              <h2>{result.title}</h2>
            </Link>
            <p>{result.author}</p>
            <p>{new Date(result.updatedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={results.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default ShowResearchResult
