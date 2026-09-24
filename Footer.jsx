import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig.js'

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24 bg-ink text-paper/80">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="urdu text-2xl text-paper">مہک سعدیہ</p>
          <p className="font-display italic text-sm mt-2 text-paper/50">
            Urdu Novelist &amp; Poet
          </p>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-5 text-sm border border-paper/25 rounded-full px-4 py-2 hover:border-paper/60 transition-colors"
          >
            {siteConfig.instagram.handle}
          </a>
        </div>

        <div className="text-sm">
          <p className="text-paper/40 tracking-wide mb-3">Bookstore</p>
          <ul className="space-y-2">
            <li><Link to="/books" className="hover:text-paper">All Books</Link></li>
            <li><Link to="/poetry" className="hover:text-paper">Poetry</Link></li>
            <li><Link to="/about" className="hover:text-paper">About the Author</Link></li>
            <li><Link to="/orders" className="hover:text-paper">My Orders</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="text-paper/40 tracking-wide mb-3">Support</p>
          <ul className="space-y-2">
            <li><Link to="/contact" className="hover:text-paper">Contact</Link></li>
            <li>
              <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-paper">
                {siteConfig.contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-5 text-center text-[12px] text-paper/40">
        © {new Date().getFullYear()} {siteConfig.authorName}. All rights reserved.
      </div>
    </footer>
  )
}
