import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProgressCard from '../components/ProgressCard'
import Sidebar from '../components/Sidebar'

const defaultTasks = [
  'Learn React Hooks',
  'Practice JavaScript Questions',
  'Revise HR Answers',
]

export default function Dashboard() {
  const { user, jobDescription, plan } = useContext(AppContext)
  const [tasks, setTasks] = useState(defaultTasks)
  const [interviewDetails, setInterviewDetails] = useState({
    company: jobDescription?.company || 'Your target company',
    date: jobDescription?.date || new Date().toISOString().slice(0, 10),
  })

  useEffect(() => {
    setInterviewDetails({
      company: jobDescription?.company || 'Your target company',
      date: jobDescription?.date || new Date().toISOString().slice(0, 10),
    })
  }, [jobDescription])

  const daysRemaining = Math.max(
    0,
    Math.ceil((new Date(interviewDetails.date) - new Date()) / (1000 * 60 * 60 * 24)),
  )

  return (
    <div className="page dashboard-page">
      <Sidebar />
      <main className="dashboard-main">
        <section className="hero-card">
          <h2>Welcome back, {user?.name || 'Candidate'}</h2>
          <p>Target Role: {user?.role || 'Front-end Developer'}</p>
        </section>
        <section className="summary-grid">
          <article className="summary-card">
            <h3>Interview Details</h3>
            <p>Company: {interviewDetails.company}</p>
            <p>Date: {new Date(interviewDetails.date).toLocaleDateString()}</p>
            <p>Days Remaining: {daysRemaining}</p>
          </article>
          <article className="summary-card">
            <h3>Preparation Progress</h3>
            <div className="progress-list">
              <ProgressCard title="JavaScript" value={80} />
              <ProgressCard title="React" value={60} />
              <ProgressCard title="Coding" value={50} />
            </div>
          </article>
          <article className="summary-card">
            <h3>Today's Tasks</h3>
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task}>✓ {task}</li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  )
}
