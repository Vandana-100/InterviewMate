import { useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'

const questions = [
  {
    id: 1,
    text: 'Tell me about a time you drove measurable impact in a project.',
    category: 'Behavioral',
    advice: 'Focus on the problem, your role, actions, and the results with metrics.',
    keywords: ['impact', 'metrics', 'delivery', 'collaboration'],
  },
  {
    id: 2,
    text: 'How would you design a feature to reduce checkout abandonment in an e-commerce app?',
    category: 'Product',
    advice: 'Talk about user flows, telemetry, A/B testing, and addressing friction points.',
    keywords: ['UX', 'data', 'experiment', 'conversion'],
  },
  {
    id: 3,
    text: 'Explain how you would debug a slow rendering React component.',
    category: 'Technical',
    advice: 'Mention profiling, memoization, unnecessary renders, and component splitting.',
    keywords: ['profiling', 'memo', 'render', 'performance'],
  },
  {
    id: 4,
    text: 'What considerations matter when building an API for mobile and web clients?',
    category: 'Architecture',
    advice: 'Discuss payload size, versioning, caching, and authentication strategy.',
    keywords: ['payload', 'versioning', 'cache', 'auth'],
  },
]

export default function MockInterview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [history, setHistory] = useState([])

  const current = questions[currentIndex]

  const progress = useMemo(() => `${currentIndex + 1}/${questions.length}`, [currentIndex])

  function evaluateAnswer(text) {
    if (!text.trim()) {
      return { type: 'error', message: 'Please type an answer before submitting.' }
    }

    const lower = text.toLowerCase()
    const score = current.keywords.reduce((count, keyword) => count + (lower.includes(keyword) ? 1 : 0), 0)
    const strength = score >= 3 ? 'Strong answer.' : score === 2 ? 'Good answer; add one more specific detail.' : 'Try to include more structure and concrete examples.'
    const recommendation = current.advice
    return { type: 'success', message: `${strength} ${recommendation}` }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const result = evaluateAnswer(answer)
    if (result.type === 'error') {
      setFeedback(result.message)
      return
    }

    setFeedback(result.message)
    setHistory((prev) => [
      ...prev,
      { question: current.text, answer, feedback: result.message },
    ])
    setAnswer('')
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))
  }

  function handleRestart() {
    setCurrentIndex(0)
    setAnswer('')
    setFeedback('')
    setHistory([])
  }

  return (
    <div className="page mock-page">
      <Sidebar />
      <main className="mock-main">
        <section className="hero-card">
          <h2>Mock Interview</h2>
          <p>Practice advanced behavioral and technical interview responses with structured feedback.</p>
        </section>

        <section className="mock-card">
          <div className="mock-header">
            <span>{current.category}</span>
            <span>{progress}</span>
          </div>
          <h3>{current.text}</h3>
          <p className="mock-advice">Advice: {current.advice}</p>
          <form onSubmit={handleSubmit}>
            <textarea
              rows="6"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here"
            />
            <button type="submit">Submit Answer</button>
          </form>
          {feedback && <p className="feedback-text">{feedback}</p>}
        </section>

        {history.length > 0 && (
          <section className="mock-review-card">
            <h3>Answer Review</h3>
            <ul>
              {history.map((entry, index) => (
                <li key={index}>
                  <strong>{entry.question}</strong>
                  <p>{entry.answer}</p>
                  <small>{entry.feedback}</small>
                </li>
              ))}
            </ul>
            <button type="button" onClick={handleRestart}>
              Restart Mock Interview
            </button>
          </section>
        )}
      </main>
    </div>
  )
}
