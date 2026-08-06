import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

export default function Profile() {
  const { user, updateProfile } = useContext(AppContext)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    experience: user?.experience || '',
  })
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await updateProfile({ ...user, ...form })
      setMessage('Profile updated successfully.')
    } catch (err) {
      setMessage(err.message)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <main className="page profile-page">
      <section className="form-card">
        <h2>Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Target Role
            <input name="role" value={form.role} onChange={handleChange} required />
          </label>
          <label>
            Experience Level
            <input name="experience" value={form.experience} onChange={handleChange} required />
          </label>
          <button type="submit">Update Profile</button>
        </form>
        {message && <p className="success-text">{message}</p>}
      </section>
    </main>
  )
}
