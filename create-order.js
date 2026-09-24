// Vercel Serverless Function — deployed automatically at /api/create-order
// when this project is pushed to Vercel with the /api folder present.
//
// This is a STRUCTURAL STUB. Install the Razorpay SDK (`npm i razorpay`)
// and set RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET as environment variables
// in your Vercel project (never in frontend code) before this will work.
//
// See README.md → "Connecting a real payment gateway" for the full,
// copy-pasteable version of this file.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, items, amount } = req.body || {}

  if (!email || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Missing email or amount' })
  }

  // ── Real implementation looks like this ──────────────────────────────
  // import Razorpay from 'razorpay'
  // const instance = new Razorpay({
  //   key_id: process.env.RAZORPAY_KEY_ID,
  //   key_secret: process.env.RAZORPAY_KEY_SECRET,
  // })
  // const order = await instance.orders.create({
  //   amount: amount * 100, // Razorpay expects paise, not rupees
  //   currency: 'INR',
  //   receipt: `order_${Date.now()}`,
  //   notes: { email, items: JSON.stringify(items) },
  // })
  // // Save a "pending" order row in your database here, keyed by order.id,
  // // so verify-payment.js can look it up after payment.
  // return res.status(200).json(order)
  // ───────────────────────────────────────────────────────────────────

  return res.status(501).json({
    error:
      'Payment gateway is not configured yet. Add RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET and uncomment the real implementation in api/create-order.js.',
  })
}
