import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { buildPreparationPlan } from '../utils/jdAnalyzer'
import { createItem } from '../utils/localDB'
import Sidebar from '../components/Sidebar'

export default function PreparationPlan() {
  const { jobDescription, plan, setPlan } = useContext(AppContext)
  const [generatedPlan, setGeneratedPlan] = useState(plan)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (jobDescription && !plan) {
      const newPlan = buildPreparationPlan(jobDescription.date, jobDescription.skills)
      setGeneratedPlan(newPlan)
      setPlan(newPlan)
    } else {
      setGeneratedPlan(plan)
    }
  }, [jobDescription, plan, setPlan])

  async function handleSaveProgress() {
    if (!generatedPlan) return
    createItem('plans', generatedPlan)
    setFeedback('Preparation plan saved successfully.')
    setTimeout(() => setFeedback(''), 2000)
  }

  function toggleTask(dayId, taskId) {
    const updated = {
      ...generatedPlan,
      schedule: generatedPlan.schedule.map((day) => {
        if (day.id !== dayId) return day
        return {
          ...day,
          tasks: day.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        }
      }),
    }
    setGeneratedPlan(updated)
    setPlan(updated)
  }

  if (!generatedPlan) {
    return (
      <main className="page center-page">
        <div className="empty-state">
          <h2>Plan unavailable</h2>
          <p>Please upload a job description first to generate a plan.</p>
        </div>
      </main>
    )
  }

  return (
    <div className="page plan-page">
      <Sidebar />
      <main className="plan-main">
        <section className="hero-card">
          <h2>Personalized Preparation Plan</h2>
          <p>Days remaining: {generatedPlan.daysRemaining}</p>
          <button onClick={handleSaveProgress}>Save Progress</button>
          {feedback && <p className="success-text">{feedback}</p>}
        </section>
        {generatedPlan.schedule.map((day) => (
          <section key={day.id} className="plan-card">
            <h3>{day.title}</h3>
            <p>{day.subject}</p>
            <ul>
              {day.tasks.map((task) => (
                <li key={task.id} className={task.completed ? 'completed-task' : ''}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(day.id, task.id)}
                    />
                    {task.label}
                  </label>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  )
}
