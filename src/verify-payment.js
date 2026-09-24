// Vercel Serverless Function — /api/verify-payment
//
// Called by the frontend after Razorpay's checkout modal reports success.
// This MUST re-verify the payment signature server-side (never trust the
// browser's word alone) before granting ebook access. STRUCTURAL STUB —
// see README.md → "Connecting a real payment gateway" for the full version.

import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { order_id, payment_id, signature, email, bookIds } = req.body || {}
  if (!order_id || !payment_id || !signature) {
    return res.status(400).json({ error: 'Missing payment details' })
  }

  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(`${order_id}|${payment_id}`)
    .digest('hex')

  if (expected !== signature) {
    return res.status(400).json({ error: 'Payment could not be verified' })
  }

  // ── Real implementation also does this ───────────────────────────────
  // 1. Mark the order as "paid" in your database (keyed by order_id).
  // 2. Generate a short-lived, signed download URL per purchased book
  //    (see api/get-download-link.js) instead of the real file path.
  // 3. Email that link to `email` via your transactional email provider.
  // ───────────────────────────────────────────────────────────────────

  return res.status(200).json({ verified: true, email, bookIds })
}
