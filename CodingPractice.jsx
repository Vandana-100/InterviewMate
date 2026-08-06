import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import codingData from '../data/coding'

export default function CodingPractice() {
  const [topic, setTopic] = useState('All')
  const [difficulty, setDifficulty] = useState('All')

  const filtered = codingData.filter((item) => {
    const matchesTopic = topic === 'All' || item.topic === topic
    const matchesDifficulty = difficulty === 'All' || item.difficulty === difficulty
    return matchesTopic && matchesDifficulty
  })

  return (
    <div className="page coding-page">
      <Sidebar />
      <main className="coding-main">
        <section className="hero-card">
          <h2>Coding Practice</h2>
          <p>Practice production-style problems with design notes and implementation details.</p>
        </section>
        <section className="filter-row">
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="All">All Topics</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Algorithms">Algorithms</option>
            <option value="Web Development">Web Development</option>
          </select>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="All">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </section>
        <div className="coding-grid">
          {filtered.map((item) => (
            <article key={item.id} className="coding-card">
              <h3>{item.problem}</h3>
              <p>Topic: {item.topic}</p>
              <p>Difficulty: {item.difficulty}</p>
              <div>
                <h4>Solution</h4>
                <p>{item.solution}</p>
              </div>
              {item.details && (
                <div>
                  <h4>Production Notes</h4>
                  <p>{item.details}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
