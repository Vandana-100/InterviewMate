import { readFromStorage, saveToStorage } from './storage'

const DB_KEYS = {
  users: 'interviewmate_users',
  jobDescriptions: 'interviewmate_jobDescriptions',
  notes: 'interviewmate_notes',
  plans: 'interviewmate_plans',
}

function readDB(key) {
  return readFromStorage(DB_KEYS[key]) || []
}

function saveDB(key, items) {
  saveToStorage(DB_KEYS[key], items)
  return items
}

export function getAll(key) {
  return readDB(key)
}

export function createItem(key, item) {
  const list = readDB(key)
  const record = { ...item, id: Date.now() }
  saveDB(key, [...list, record])
  return record
}

export function updateItem(key, id, updates) {
  const list = readDB(key)
  const updated = list.map((item) => (item.id === id ? { ...item, ...updates } : item))
  saveDB(key, updated)
  return updated.find((item) => item.id === id)
}

export function removeItem(key, id) {
  const list = readDB(key)
  const filtered = list.filter((item) => item.id !== id)
  saveDB(key, filtered)
  return filtered
}
