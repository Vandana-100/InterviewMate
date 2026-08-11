import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export default function Login() {
  const { loginUser } = useContext(AppContext)
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await loginUser(credentials.email, credentials.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className="page auth-page">
      <section className="form-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          New to InterviewMate AI? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  )
}
