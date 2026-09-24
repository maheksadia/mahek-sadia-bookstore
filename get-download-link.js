// Vercel Serverless Function — /api/get-download-link
//
// This is the ONLY safe way to hand out an ebook file. The real PDF/EPUB
// never sits in /public (which is fully public) and never appears in
// src/data/books.js. It lives in private storage, and this function
// checks the database for a paid order before generating a temporary,
// signed URL that expires after a short time.
//
// STRUCTURAL STUB — see README.md → "Securing ebook downloads".

export default async function handler(req, res) {
  const { orderId, bookId, email } = req.query || {}

  if (!orderId || !bookId || !email) {
    return res.status(400).json({ error: 'Missing orderId, bookId or email' })
  }

  // ── Real implementation looks like this ──────────────────────────────
  // 1. Look up the order in your database by orderId + email.
  // 2. Confirm status === 'paid' and that bookId was part of that order.
  // 3. If using Supabase Storage: create a signed URL valid for e.g. 10
  //    minutes:
  //      const { data } = await supabase.storage
  //        .from('ebooks-private')
  //        .createSignedUrl(`${bookId}.pdf`, 60 * 10)
  //      return res.status(200).json({ url: data.signedUrl })
  //    (Similarly, S3/Cloudflare R2 support presigned URLs.)
  // ───────────────────────────────────────────────────────────────────

  return res.status(501).json({
    error: 'Not configured yet — connect a database and private file storage first.',
  })
}
