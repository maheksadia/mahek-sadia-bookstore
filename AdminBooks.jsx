import { useState } from 'react'
import { books as catalogBooks } from '../../data/books.js'
import { formatPrice } from '../../utils/format.js'

// ─────────────────────────────────────────────────────────────────────────
// DEMO ADMIN — this manages a browser-only copy of the catalog so you can
// see the add/edit/delete/feature/price/coming-soon workflow. Changes here
// live in this browser's localStorage only; they do NOT edit src/data/books.js
// and are not visible to real site visitors.
//
// The permanent way to add a book is simply editing src/data/books.js
// (see README.md → "How to add a new book"). To make this dashboard write
// to a real, shared database instead of localStorage, see README.md →
// "Making the admin dashboard permanent".
// ─────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ms-admin-books-demo'

function loadBooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : catalogBooks
  } catch {
    return catalogBooks
  }
}

const emptyDraft = {
  id: '',
  title: '',
  romanTitle: '',
  descriptionEn: '',
  price: '',
  genre: 'novels',
  status: 'available',
  featured: false,
}

export default function AdminBooks() {
  const [books, setBooks] = useState(loadBooks)
  const [draft, setDraft] = useState(emptyDraft)
  const [editingId, setEditingId] = useState(null)

  function persist(next) {
    setBooks(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function handleSave(e) {
    e.preventDefault()
    if (!draft.id || !draft.title) return

    if (editingId) {
      persist(books.map((b) => (b.id === editingId ? { ...b, ...draft, price: Number(draft.price) || null } : b)))
    } else {
      persist([...books, { ...draft, price: Number(draft.price) || null, coverPalette: ['#15130F', '#A9803F'], format: ['PDF'] }])
    }
    setDraft(emptyDraft)
    setEditingId(null)
  }

  function handleEdit(book) {
    setDraft({
      id: book.id,
      title: book.title,
      romanTitle: book.romanTitle,
      descriptionEn: book.descriptionEn,
      price: book.price ?? '',
      genre: book.genre,
      status: book.status,
      featured: book.featured,
    })
    setEditingId(book.id)
  }

  function handleDelete(id) {
    persist(books.filter((b) => b.id !== id))
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10">
      <div>
        <h2 className="font-display text-lg text-ink mb-4">
          {editingId ? 'Edit Book' : 'Add a Book'}
        </h2>
        <form onSubmit={handleSave} className="flex flex-col gap-3 text-sm">
          <input
            required
            disabled={!!editingId}
            placeholder="Unique id (e.g. my-new-book)"
            value={draft.id}
            onChange={(e) => setDraft({ ...draft, id: e.target.value })}
            className="border border-line rounded-sm px-3 py-2 bg-transparent disabled:opacity-50"
          />
          <input
            required
            placeholder="Urdu title"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="border border-line rounded-sm px-3 py-2 bg-transparent urdu"
          />
          <input
            placeholder="Roman title"
            value={draft.romanTitle}
            onChange={(e) => setDraft({ ...draft, romanTitle: e.target.value })}
            className="border border-line rounded-sm px-3 py-2 bg-transparent"
          />
          <textarea
            placeholder="Short English description"
            value={draft.descriptionEn}
            onChange={(e) => setDraft({ ...draft, descriptionEn: e.target.value })}
            className="border border-line rounded-sm px-3 py-2 bg-transparent resize-none"
            rows={3}
          />
          <input
            type="number"
            placeholder="Price in INR"
            value={draft.price}
            onChange={(e) => setDraft({ ...draft, price: e.target.value })}
            className="border border-line rounded-sm px-3 py-2 bg-transparent"
          />
          <select
            value={draft.genre}
            onChange={(e) => setDraft({ ...draft, genre: e.target.value })}
            className="border border-line rounded-sm px-3 py-2 bg-transparent"
          >
            <option value="novels">Novels</option>
            <option value="poetry">Poetry</option>
            <option value="islamic-fiction">Islamic Fiction</option>
            <option value="social-fiction">Social Fiction</option>
            <option value="short-stories">Short Stories</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <select
            value={draft.status}
            onChange={(e) => setDraft({ ...draft, status: e.target.value })}
            className="border border-line rounded-sm px-3 py-2 bg-transparent"
          >
            <option value="available">Available</option>
            <option value="coming-soon">Coming Soon</option>
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
            />
            Featured on homepage
          </label>

          <label className="text-ink/50 text-xs">
            Cover image upload (demo only — see README for real storage)
            <input type="file" accept="image/*" className="block mt-1 text-xs" disabled />
          </label>
          <label className="text-ink/50 text-xs">
            Ebook file upload (demo only — see README for secure storage)
            <input type="file" accept=".pdf,.epub" className="block mt-1 text-xs" disabled />
          </label>

          <div className="flex gap-3 mt-2">
            <button className="bg-ink text-paper rounded-sm px-5 py-2">
              {editingId ? 'Save Changes' : 'Add Book'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setDraft(emptyDraft); setEditingId(null) }}
                className="text-ink/50 underline"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-display text-lg text-ink mb-4">Catalog ({books.length})</h2>
        <div className="flex flex-col divide-y divide-line border-y border-line max-h-[520px] overflow-y-auto">
          {books.map((b) => (
            <div key={b.id} className="py-3 flex items-center justify-between gap-3 text-sm">
              <div>
                <p className="urdu">{b.title}</p>
                <p className="text-ink/40 text-xs">
                  {formatPrice(b.price)} · {b.genre} · {b.featured ? 'Featured' : ''}{' '}
                  {b.status === 'coming-soon' ? '· Coming Soon' : ''}
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={() => handleEdit(b)} className="text-gold underline">Edit</button>
                <button onClick={() => handleDelete(b.id)} className="text-ink/40 underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
