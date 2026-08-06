import { createContext, useEffect, useMemo, useState } from 'react'
import { createItem, getAll, updateItem } from '../utils/localDB'
import { readFromStorage, saveToStorage, removeFromStorage } from '../utils/storage'

export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(readFromStorage('interviewmate_user'))
  const [token, setToken] = useState(readFromStorage('interviewmate_token'))
  const [jobDescription, setJobDescription] = useState(null)
  const [plan, setPlan] = useState(null)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    if (user === null) {
      removeFromStorage('interviewmate_user')
      return
    }
    saveToStorage('interviewmate_user', user)
  }, [user])

  useEffect(() => {
    if (token === null) {
      removeFromStorage('interviewmate_token')
      return
    }
    saveToStorage('interviewmate_token', token)
  }, [token])

  async function registerUser(userData) {
    try {
      const existingUsers = getAll('users')
      const duplicate = existingUsers.find((userItem) => userItem.email === userData.email)
      if (duplicate) {
        throw new Error('A user with this email already exists.')
      }
      const created = createItem('users', userData)
      setUser(created)
      setToken(created.email)
      return created
    } catch (error) {
      throw new Error(error.message || 'Unable to register. Please try again.')
    }
  }

  async function loginUser(email, password) {
    try {
      const users = getAll('users')
      const found = users.find(
        (item) => item.email === email && item.password === password,
      )
      if (!found) {
        throw new Error('Invalid email or password')
      }
      setUser(found)
      setToken(found.email)
      return found
    } catch (error) {
      throw new Error(error.message || 'Unable to login. Please try again.')
    }
  }

  async function updateProfile(updatedData) {
    if (!user?.id) {
      throw new Error('User not found')
    }
    const updated = updateItem('users', user.id, updatedData)
    setUser(updated)
    return updated
  }

  const value = useMemo(
    () => ({
      user,
      token,
      jobDescription,
      plan,
      progress,
      setJobDescription,
      setPlan,
      setProgress,
      registerUser,
      loginUser,
      updateProfile,
      logout: () => {
        setUser(null)
        setToken(null)
        removeFromStorage('interviewmate_user')
        removeFromStorage('interviewmate_token')
        setJobDescription(null)
        setPlan(null)
        setProgress(null)
      },
    }),
    [user, token, jobDescription, plan, progress],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
