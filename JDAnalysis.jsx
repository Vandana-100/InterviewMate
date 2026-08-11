import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import Sidebar from '../components/Sidebar'

export default function JDAnalysis() {
  const { jobDescription } = useContext(AppContext)

  if (!jobDescription) {
    return (
      <main className="page center-page">
        <div className="empty-state">
          <h2>No JD available</h2>
          <p>Please upload a job description to see the analysis.</p>
        </div>
      </main>
    )
  }

  return (
    <div className="page analysis-page">
      <Sidebar />
      <main className="analysis-main">
        <section className="hero-card">
          <h2>{jobDescription.company} - {jobDescription.role}</h2>
          <p>Interview Date: {new Date(jobDescription.date).toLocaleDateString()}</p>
        </section>
        <section className="analysis-card">
          <h3>Required Skills</h3>
          <div className="tag-list">
            {jobDescription.skills?.map((skill) => (
              <span key={skill} className="tag-item">{skill}</span>
            ))}
          </div>
        </section>
        <section className="analysis-card">
          <h3>Preparation Topics</h3>
          <ul>
            {jobDescription.topics?.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
