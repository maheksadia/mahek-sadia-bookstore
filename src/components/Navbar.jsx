import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { siteConfig } from '../data/siteConfig.js'

const LINKS = [
  { to: '/books', label: 'All Books' },
  { to: '/poetry', label: 'Poetry' },
  { to: '/about', label: 'About the Author' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="urdu text-xl text-ink">مہک سعدیہ</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[13.5px] tracking-wide transition-colors ${
                  isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-[13.5px] text-ink/80 hover:text-ink">
            Cart
            {items.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-gold text-paper text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          <button
            className="md:hidden text-ink"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-5 h-px bg-ink mb-1.5" />
            <span className="block w-5 h-px bg-ink mb-1.5" />
            <span className="block w-3.5 h-px bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-paper px-5 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="text-[15px] text-ink/80"
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="text-[15px] text-gold"
          >
            {siteConfig.instagram.handle} on Instagram
          </a>
        </nav>
      )}
    </header>
  )
}
