export function saveToStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function readFromStorage(key) {
  const stored = window.localStorage.getItem(key)
  return stored ? JSON.parse(stored) : null
}

export function removeFromStorage(key) {
  window.localStorage.removeItem(key)
}
