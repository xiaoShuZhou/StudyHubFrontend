import {
  Routes, Route
} from 'react-router-dom'

import Home from './views/Home'
import About from './views/About'
import ShowBlogs from './views/ShowBlogs'
import Post from './views/Post'
import Header from './components/Header'
import Footer from './components/Footer'


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/showblogs" element={<ShowBlogs />} />
        <Route path="/post" element={<Post />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App