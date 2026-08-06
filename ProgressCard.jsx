export default function ProgressCard({ title, value }) {
  return (
    <div className="progress-card">
      <h4>{title}</h4>
      <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{ width: `${value}%` }} />
      </div>
      <span>{value}%</span>
    </div>
  )
}
