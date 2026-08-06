import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Navbar() {
  const { user, logout } = useContext(AppContext)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">InterviewMate AI</Link>
      </div>
      <nav className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/upload-jd">Upload JD</Link>
            <Link to="/learning">Learning</Link>
            <Link to="/notes">Notes</Link>
            <Link to="/questions">Questions</Link>
            <Link to="/coding">Coding</Link>
            <Link to="/mock">Mock Interview</Link>
            <Link to="/profile">Profile</Link>
            <button type="button" className="link-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
