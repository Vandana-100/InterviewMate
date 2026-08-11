import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { analyzeDescription } from '../utils/jdAnalyzer'
import { createItem } from '../utils/localDB'

export default function UploadJD() {
  const { setJobDescription } = useContext(AppContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    company: '',
    role: '',
    date: '',
    description: '',
  })
  const [message, setMessage] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const analysis = analyzeDescription(form.description)
    const payload = { ...form, ...analysis, createdAt: new Date().toISOString() }
    const saved = createItem('jobDescriptions', payload)
    setJobDescription(saved)
    setMessage('Job description saved successfully.')
    setTimeout(() => {
      navigate('/analysis')
    }, 800)
  }

  return (
    <main className="page form-page">
      <section className="form-card">
        <h2>Upload Job Description</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Company Name
            <input name="company" value={form.company} onChange={handleChange} required />
          </label>
          <label>
            Role
            <input name="role" value={form.role} onChange={handleChange} required />
          </label>
          <label>
            Interview Date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Job Description
            <textarea
              name="description"
              rows="6"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Analyze JD</button>
        </form>
        {message && <p className="success-text">{message}</p>}
      </section>
    </main>
  )
}
