import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Quick Access</h3>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/upload-jd">Upload JD</Link>
        </li>
        <li>
          <Link to="/analysis">JD Analysis</Link>
        </li>
        <li>
          <Link to="/plan">Preparation Plan</Link>
        </li>
        <li>
          <Link to="/learning">Learning</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/questions">Questions</Link>
        </li>
        <li>
          <Link to="/coding">Coding</Link>
        </li>
        <li>
          <Link to="/mock">Mock Interview</Link>
        </li>
      </ul>
    </aside>
  )
}
