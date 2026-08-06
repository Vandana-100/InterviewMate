import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import questionsData from '../data/questions'

export default function Questions() {
  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState('All')
  const [selectedId, setSelectedId] = useState(null)

  const filtered = questionsData.filter((item) => {
    const matchesSearch = item.question.toLowerCase().includes(search.toLowerCase())
    const matchesTopic = topic === 'All' || item.topic === topic
    return matchesSearch && matchesTopic
  })

  return (
    <div className="page questions-page">
      <Sidebar />
      <main className="questions-main">
        <section className="hero-card">
          <h2>Interview Questions</h2>
          <p>Search realistic technical and behavioral questions used in professional interviews.</p>
        </section>
        <section className="filter-row">
          <input
            placeholder="Search questions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="All">All Topics</option>
            <option value="Behavioral">Behavioral</option>
            <option value="React">React</option>
            <option value="APIs">APIs</option>
            <option value="Accessibility">Accessibility</option>
            <option value="Debugging">Debugging</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </section>
        {filtered.map((item) => (
          <article key={item.id} className="question-card">
            <div className="question-header">
              <h3>{item.question}</h3>
              <span>{item.difficulty}</span>
            </div>
            <p>Topic: {item.topic}</p>
            <button onClick={() => setSelectedId(item.id)}>
              {selectedId === item.id ? 'Hide Answer' : 'Show Answer'}
            </button>
            {selectedId === item.id && <p className="answer-text">{item.answer}</p>}
          </article>
        ))}
      </main>
    </div>
  )
}
