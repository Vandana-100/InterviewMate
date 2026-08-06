import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AppContext)
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
