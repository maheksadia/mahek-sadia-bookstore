import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// DEMO ONLY. This is not real authentication — it exists so the dashboard
// layout below is easy to preview. Do not deploy this as-is with a real
// password. See README.md → "Admin dashboard" for how to secure this
// properly (e.g. Vercel password protection, or a real auth provider).
export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (password === 'demo-admin') {
      sessionStorage.setItem('ms-admin', '1')
      navigate('/admin/books')
    } else {
      setError(true)
    }
  }

  return (
    <div className="max-w-sm mx-auto px-5 py-24">
      <h1 className="font-display text-2xl text-ink mb-1">Admin Access</h1>
      <p className="text-sm text-ink/50 mb-6">Demo password: demo-admin</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-line rounded-sm px-4 py-3 text-sm bg-transparent focus:border-gold outline-none"
          placeholder="Password"
        />
        <button className="bg-ink text-paper text-sm rounded-sm py-3 hover:bg-gold transition-colors">
          Enter Dashboard
        </button>
        {error && <p className="text-sm text-red-800">Incorrect password.</p>}
      </form>
    </div>
  )
}
