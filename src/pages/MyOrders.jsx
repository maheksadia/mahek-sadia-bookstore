import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'

// Order history and secure downloads must be looked up server-side, keyed
// by the buyer's email — never stored in the browser. This page is the
// frontend shell; wire it to GET /api/orders?email=... once the backend
// in /api is deployed. See README.md → "Securing ebook downloads".
export default function MyOrders() {
  const [email, setEmail] = useState('')
  const [searched, setSearched] = useState(false)

  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-14 md:py-20">
      <SectionHeading urdu="میرے آرڈرز" english="My Orders" />

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSearched(true)
        }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          required
          type="email"
          placeholder="Enter the email you purchased with"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border border-line rounded-sm px-4 py-3 text-sm bg-transparent focus:border-gold outline-none"
        />
        <button className="bg-ink text-paper text-sm rounded-sm px-6 py-3 hover:bg-gold transition-colors">
          Find Orders
        </button>
      </form>

      {searched && (
        <p className="text-[13px] text-ink/60 bg-parchment border border-line rounded-sm p-4 leading-relaxed mt-6">
          Order lookup requires the backend described in README.md — once connected,
          purchases made with {email || 'this email'} and their secure download links
          will appear here automatically.
        </p>
      )}
    </div>
  )
}
