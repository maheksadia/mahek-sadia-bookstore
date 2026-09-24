import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/format.js'
import SectionHeading from '../components/SectionHeading.jsx'

// ─────────────────────────────────────────────────────────────────────────
// PAYMENT INTEGRATION — structure only, nothing here is faked.
//
// This page is wired for Razorpay (best fit for Indian UPI / cards / net
// banking / wallets), with the real call graph a production integration
// needs. It intentionally does NOT pretend a payment succeeded — if the
// backend endpoints below don't exist yet (as in this starter project),
// it tells the visitor honestly instead of faking a receipt.
//
// The real flow, once a backend is deployed (see README → "Connecting a
// real payment gateway"):
//   1. Frontend calls POST /api/create-order  → backend calls Razorpay's
//      Orders API using the SECRET key (server-side only) and returns an
//      order id.
//   2. Frontend opens Razorpay's Checkout.js with that order id — this is
//      what actually shows UPI / GPay / PhonePe / Paytm / cards / net
//      banking, because Razorpay's own checkout renders those.
//   3. On success, Razorpay calls the frontend back with a payment id +
//      signature. Frontend calls POST /api/verify-payment which re-checks
//      the signature server-side using the SECRET key, then marks the
//      order paid in the database and emails the buyer a secure,
//      short-lived download link.
// No secret key is ever present in this file or anywhere in src/.
// ─────────────────────────────────────────────────────────────────────────

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | processing | backend-missing | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handlePay(e) {
    e.preventDefault()
    setStatus('processing')
    setErrorMsg('')

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          items: items.map((i) => ({ id: i.id, price: i.price })),
          amount: total,
        }),
      })

      if (!res.ok) throw new Error('backend-missing')
      const order = await res.json()

      // In production, this is where window.Razorpay(options).open() runs,
      // using order.id returned above. See README for the full snippet.
      console.log('Order created, ready to open Razorpay checkout:', order)
    } catch (err) {
      // This starter project ships without a live backend, so this branch
      // is what most people will see until Vercel functions + Razorpay
      // keys are connected. It is deliberately honest about that.
      setStatus('backend-missing')
      setErrorMsg(
        'Payment cannot be completed yet — the payment gateway backend is not connected. See README.md → "Connecting a real payment gateway" to enable real UPI / card / net-banking payments with Razorpay.'
      )
      return
    }

    setStatus('idle')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <p className="font-display italic text-ink/60">Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <SectionHeading urdu="ادائیگی" english="Checkout" />

      <div className="flex flex-col divide-y divide-line border-y border-line mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-3">
            <span className="urdu text-ink">{item.title}</span>
            <span className="font-display text-ink">{formatPrice(item.price)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-8">
        <span className="text-ink/60 text-sm">Total</span>
        <span className="font-display text-2xl text-ink">{formatPrice(total)}</span>
      </div>

      <form onSubmit={handlePay} className="flex flex-col gap-4">
        <label className="text-sm text-ink/60">
          Email address (your ebook access will be sent here)
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-line rounded-sm px-4 py-3 text-sm bg-transparent focus:border-gold outline-none"
            placeholder="you@example.com"
          />
        </label>

        <div className="flex flex-wrap gap-2 text-[11px] text-ink/40 tracking-wide">
          <span className="border border-line rounded-full px-3 py-1">UPI</span>
          <span className="border border-line rounded-full px-3 py-1">Google Pay</span>
          <span className="border border-line rounded-full px-3 py-1">PhonePe</span>
          <span className="border border-line rounded-full px-3 py-1">Paytm</span>
          <span className="border border-line rounded-full px-3 py-1">Cards</span>
          <span className="border border-line rounded-full px-3 py-1">Net Banking</span>
        </div>

        <button
          type="submit"
          disabled={status === 'processing'}
          className="mt-2 bg-ink text-paper text-sm tracking-wide rounded-sm py-3 hover:bg-gold transition-colors disabled:opacity-50"
        >
          {status === 'processing' ? 'Processing…' : `Pay ${formatPrice(total)}`}
        </button>

        {status === 'backend-missing' && (
          <p className="text-[13px] text-ink/60 bg-parchment border border-line rounded-sm p-4 leading-relaxed">
            {errorMsg}
          </p>
        )}
      </form>
    </div>
  )
}
