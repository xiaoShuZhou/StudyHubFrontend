

const profile = ({ handleLogout }) => {

  return (
    <div>
      <h2>Your Blogs:</h2>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default profile