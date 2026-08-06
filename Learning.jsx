import Sidebar from '../components/Sidebar'
import learningData from '../data/learning'

export default function Learning() {
  return (
    <div className="page learning-page">
      <Sidebar />
      <main className="learning-main">
        <section className="hero-card">
          <h2>Learning Module</h2>
          <p>Review important interview topics and examples.</p>
        </section>
        {learningData.map((item) => (
          <article key={item.id} className="learning-card">
            <h3>{item.topic}</h3>
            <p>{item.explanation}</p>
            <div>
              <h4>Interview Points</h4>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Example</h4>
              <p>{item.example}</p>
            </div>
          </article>
        ))}
      </main>
    </div>
  )
}
