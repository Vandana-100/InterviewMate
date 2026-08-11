import { useContext, useEffect, useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { AppContext } from '../context/AppContext'
import { createItem, getAll, removeItem, updateItem } from '../utils/localDB'

const initialNote = { title: '', content: '', topic: '', favorite: false }

export default function Notes() {
  const { user } = useContext(AppContext)
  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState('')
  const [noteDraft, setNoteDraft] = useState(initialNote)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function loadNotes() {
      setLoading(true)
      const data = getAll('notes')
      setNotes(data.filter((item) => item.userId === user?.id))
      setLoading(false)
    }
    if (user) {
      loadNotes()
    }
  }, [user])

  function handleSave(e) {
    e.preventDefault()
    const payload = {
      ...noteDraft,
      userId: user.id,
      createdDate: noteDraft.createdDate || new Date().toISOString(),
    }

    if (editingId) {
      const updated = updateItem('notes', editingId, payload)
      setNotes((prev) => prev.map((note) => (note.id === updated.id ? updated : note)))
    } else {
      const created = createItem('notes', payload)
      setNotes((prev) => [created, ...prev])
    }

    setNoteDraft(initialNote)
    setEditingId(null)
  }

  function handleEdit(note) {
    setNoteDraft(note)
    setEditingId(note.id)
  }

  function handleDelete(id) {
    removeItem('notes', id)
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  function toggleFavorite(note) {
    const updated = updateItem('notes', note.id, { ...note, favorite: !note.favorite })
    setNotes((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
  }

  const filteredNotes = useMemo(
    () => notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase()) ||
        note.topic.toLowerCase().includes(search.toLowerCase()),
    ),
    [notes, search],
  )

  return (
    <div className="page notes-page">
      <Sidebar />
      <main className="notes-main">
        <section className="hero-card">
          <h2>Personal Notes</h2>
          <p>Create, edit, and save your interview notes.</p>
        </section>
        <section className="notes-form-card">
          <form onSubmit={handleSave}>
            <label>
              Title
              <input
                name="title"
                value={noteDraft.title}
                onChange={(e) => setNoteDraft((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </label>
            <label>
              Topic
              <input
                name="topic"
                value={noteDraft.topic}
                onChange={(e) => setNoteDraft((prev) => ({ ...prev, topic: e.target.value }))}
                required
              />
            </label>
            <label>
              Content
              <textarea
                rows="5"
                value={noteDraft.content}
                onChange={(e) => setNoteDraft((prev) => ({ ...prev, content: e.target.value }))}
                required
              />
            </label>
            <label>
              Favorite
              <input
                type="checkbox"
                checked={noteDraft.favorite}
                onChange={(e) => setNoteDraft((prev) => ({ ...prev, favorite: e.target.checked }))}
              />
            </label>
            <button type="submit">{editingId ? 'Update Note' : 'Save Note'}</button>
          </form>
        </section>
        <section className="notes-list-card">
          <div className="notes-header">
            <input
              placeholder="Search notes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <p>Loading notes...</p>
          ) : (
            <div className="note-grid">
              {filteredNotes.map((note) => (
                <article key={note.id} className="note-card">
                  <div className="note-header">
                    <h4>{note.title}</h4>
                    <button type="button" onClick={() => toggleFavorite(note)}>
                      {note.favorite ? '★' : '☆'}
                    </button>
                  </div>
                  <p>{note.content}</p>
                  <small>Topic: {note.topic}</small>
                  <div className="note-actions">
                    <button type="button" onClick={() => handleEdit(note)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(note.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
