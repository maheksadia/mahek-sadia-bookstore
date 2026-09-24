import { Navigate, NavLink, Outlet } from 'react-router-dom'

export default function AdminDashboard() {
  const authed = sessionStorage.getItem('ms-admin') === '1'
  if (!authed) return <Navigate to="/admin" replace />

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl text-ink">Admin Dashboard</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem('ms-admin')
            window.location.href = '/admin'
          }}
          className="text-sm text-ink/50 underline"
        >
          Log out
        </button>
      </div>

      <nav className="flex gap-6 border-b border-line mb-8 text-sm">
        <NavLink
          to="/admin/books"
          className={({ isActive }) => `pb-3 border-b-2 ${isActive ? 'border-ink text-ink' : 'border-transparent text-ink/50'}`}
        >
          Books
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => `pb-3 border-b-2 ${isActive ? 'border-ink text-ink' : 'border-transparent text-ink/50'}`}
        >
          Orders
        </NavLink>
      </nav>

      <Outlet />
    </div>
  )
}
