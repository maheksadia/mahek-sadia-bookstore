# مہک سعدیہ — Mahek Sadia | Official Digital Bookstore

A premium, mobile-first digital bookstore for Urdu novelist & poet **Mahek Sadia**,
built to grow to dozens of books without any redesign. Built with **React +
Vite + Tailwind CSS + React Router**.

---

## 1. Folder structure

```
mahek-sadia-bookstore/
├── api/                        # Backend serverless functions (Vercel)
│   ├── create-order.js         # Step 1 of payment: create a Razorpay order
│   ├── verify-payment.js       # Step 2: verify payment signature server-side
│   └── get-download-link.js    # Step 3: issue a secure, temporary ebook link
├── public/
│   └── covers/                 # Put real book cover images here
├── src/
│   ├── components/             # Navbar, Footer, Hero, BookCard, BookGrid,
│   │                           # CategoryFilter, BookCover, SectionHeading
│   ├── context/
│   │   └── CartContext.jsx     # Cart state, persisted to localStorage
│   ├── data/
│   │   ├── books.js            # ⭐ THE CATALOG — add books here
│   │   └── siteConfig.js       # Author name, Instagram, email, etc.
│   ├── pages/
│   │   ├── Home.jsx, AllBooks.jsx, BookDetails.jsx, AboutAuthor.jsx,
│   │   │   Poetry.jsx, Contact.jsx, Cart.jsx, Checkout.jsx, MyOrders.jsx
│   │   └── admin/               # Demo admin dashboard (Books, Orders)
│   ├── utils/format.js
│   ├── App.jsx                 # Routes
│   └── main.jsx                # Entry point
├── .env.example                # Where every secret key belongs
├── tailwind.config.js          # Brand colors & type scale
└── package.json
```

---

## 2. Setup instructions (local development)

Requirements: [Node.js](https://nodejs.org) 18 or newer.

```bash
cd mahek-sadia-bookstore
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). The site is fully
usable immediately — browsing, filtering, cart, and checkout UI all work.
Actual payment processing needs the backend described in section 7.

To build for production:

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## 3. How to add a new book

Everything the site displays — Home's featured shelf, All Books, category
filters, and each Book Details page — is generated from **one file**:
`src/data/books.js`.

To add a book, copy an existing object in the `books` array and edit it:

```js
{
  id: 'unique-slug-no-spaces',          // used in the URL: /books/unique-slug-no-spaces
  title: 'اردو عنوان',                    // Urdu title
  romanTitle: 'Roman Urdu Title',
  author: 'مہک سعدیہ',
  description: 'ایک مختصر تعارف اردو میں۔',
  descriptionEn: 'A short English description shown on cards.',
  aboutBook: 'کتاب کے بارے میں تفصیلی معلومات۔',
  price: 199,                            // in INR, or null if not priced yet
  coverPalette: ['#15130F', '#A9803F'],  // used until you add a real cover
  cover: null,                           // or '/covers/your-file.jpg'
  pdf: null,                             // leave null — see section 6
  sample: null,                          // link to a sample PDF, if any
  genre: 'novels',                       // novels | poetry | islamic-fiction
                                          // | social-fiction | short-stories | upcoming
  language: 'Urdu',                      // Urdu | Roman Urdu | Both
  pages: 180,
  format: ['PDF', 'EPUB'],
  status: 'available',                   // or 'coming-soon'
  featured: true,                        // shows on the homepage
  publishedDate: '2026-01-01',
}
```

Save the file — that's it. No other file needs to change. This is intentional:
you can add 10, 50, or 200 books this way. The admin dashboard (section 5)
also gives a visual add/edit/delete flow, but permanently changing what
visitors see always comes back to editing this file (or, once you set up a
database — see section 9 — an admin panel writing to that database instead).

## 4. How to replace book covers

1. Drop the image file into `public/covers/` — e.g. `public/covers/darmiyan.jpg`.
   Recommended: a portrait image, roughly 3:4 ratio (e.g. 900×1200px), under 500KB.
2. In `src/data/books.js`, set that book's `cover` field:
   ```js
   cover: '/covers/darmiyan.jpg',
   ```
3. Until you do this, the site shows an elegant generated placeholder cover
   using the book's title and `coverPalette` — so nothing ever looks broken.

## 5. Admin dashboard (what's included, and what it isn't)

Visiting `/admin` (demo password: `demo-admin`, set in
`src/pages/admin/AdminLogin.jsx`) shows a working add/edit/delete/feature/
price/coming-soon interface for books, and an Orders tab.

**Important honesty note:** this demo dashboard writes to *your own
browser's* localStorage only, so you can see and test the workflow. It does
not change what real visitors see, and different browsers/devices won't see
each other's changes. Making it permanent requires a backend — see section 9.
The permanent, always-works way to add/edit books today is directly editing
`src/data/books.js` (section 3) and redeploying (section 8 — this takes
under a minute on Vercel/Netlify, including for future updates).

## 6. How to upload ebooks securely

**Never** put real PDF/EPUB files in the `public/` folder or reference them
directly in `src/data/books.js` — anything in `public/` or shipped to the
browser is downloadable by anyone who finds the URL, purchase or not.

The correct flow:

1. Upload the real ebook files to **private** storage — not `public/`. Good
   free-tier options: Supabase Storage (private bucket), Cloudflare R2, or
   AWS S3 (private bucket).
2. Never put the file's real path in any frontend file.
3. When `api/verify-payment.js` confirms a payment, it calls
   `api/get-download-link.js`, which checks the database for a paid order
   and only then generates a **signed, temporary URL** (expires in minutes)
   using your storage provider's SDK — see the commented example already in
   that file.
4. Email that temporary link to the buyer, and/or show it on an order
   confirmation / "My Orders" page looked up by their email.

This is why `pdf` in `books.js` is a harmless placeholder path — the real
file is never in frontend code at all.

## 7. How to connect a real payment gateway

**This project does not fake payment processing.** A static frontend alone
cannot safely charge a card or verify UPI — that always requires a backend
holding a secret key, which is why `/api` exists.

Recommended gateway for Indian customers: **Razorpay** (supports UPI, Google
Pay, PhonePe, Paytm, cards, and net banking in a single checkout widget).
Architecture is already in place for it — three files in `/api` are fully
commented stubs for the three real calls needed. To make it live:

1. Create a [Razorpay account](https://razorpay.com) and get your Key ID +
   Key Secret from the dashboard.
2. `npm install razorpay` in this project.
3. In `api/create-order.js`, uncomment the real implementation block and
   remove the `501` placeholder response.
4. Set environment variables (never commit these):
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` — backend only
   - `VITE_RAZORPAY_KEY_ID` — the *same* key ID, safe to expose to the
     frontend since Razorpay's own Checkout.js needs it client-side
5. In `src/pages/Checkout.jsx`, after `create-order` succeeds, open
   Razorpay's widget:
   ```js
   const rzp = new window.Razorpay({
     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
     amount: order.amount,
     currency: 'INR',
     order_id: order.id,
     handler: async (response) => {
       await fetch('/api/verify-payment', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           order_id: response.razorpay_order_id,
           payment_id: response.razorpay_payment_id,
           signature: response.razorpay_signature,
           email, bookIds: items.map(i => i.id),
         }),
       })
       // then redirect to an order-success page
     },
   })
   rzp.open()
   ```
   (Load Razorpay's script once in `index.html`:
   `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`.)
6. Uncomment the real verification logic in `api/verify-payment.js`.

**Adding PayPal or Stripe later** for international customers: add
`api/create-paypal-order.js` / `api/create-stripe-session.js` alongside the
Razorpay ones, and show a currency/gateway switcher in `Checkout.jsx`. The
same pattern applies — secret keys live only in `/api`, never in `/src`.

## 8. How to deploy for free

This project deploys to **Vercel** (recommended, because `/api` becomes
serverless functions automatically) with zero config:

1. Push this folder to a new GitHub repository.
2. Go to [vercel.com](https://vercel.com) → "New Project" → import the repo.
3. Framework preset: Vite (auto-detected). Click Deploy.
4. Add your environment variables from `.env.example` under
   Project → Settings → Environment Variables.
5. Every future `git push` redeploys automatically.

Netlify works too for the frontend (same steps), but you'd use Netlify
Functions instead of the `/api` folder as written (the code inside each
function is nearly identical; only the file location/export style differs).
GitHub Pages can only host the static frontend — it cannot run `/api`, so
it's fine for previewing the design but not for real payments.

Your site will initially live at a free subdomain like
`mahek-sadia-bookstore.vercel.app`.

## 9. How to connect a custom domain later

1. Buy a domain (e.g. `maheksadia.com`) from any registrar — this is the one
   piece that realistically costs money (roughly ₹700–₹1,500/year for a
   `.com`).
2. In Vercel: Project → Settings → Domains → add your domain.
3. Vercel shows you 1–2 DNS records to add at your registrar (usually an A
   record and/or CNAME). Add them there.
4. Wait for DNS to propagate (usually minutes, sometimes a few hours).
   Vercel issues a free HTTPS certificate automatically.

## 10. What's free vs. what eventually costs money

| Piece | Free option used here | When it might cost money |
|---|---|---|
| Hosting (frontend + `/api`) | Vercel free tier | Only at very high traffic |
| Book catalog, cart, browsing | Fully static, always free | — |
| Custom domain | — | ~₹700–1,500/year, your choice when |
| Database (orders, purchases) | Supabase free tier (500MB) is enough for years of a single-author store | Paid tier only if you outgrow it |
| Private ebook file storage | Supabase Storage free tier, or Cloudflare R2 (very generous free tier) | Paid only at large file volumes |
| Payment gateway | Razorpay has no monthly fee | Razorpay takes a small % + GST per transaction — unavoidable with any real gateway |
| Transactional email (sending download links) | Resend/Brevo free tiers (100s/day) | Paid only past free-tier volume |
| Admin protection | Simple password today | A proper auth provider (e.g. Clerk/Supabase Auth free tier) if you want stronger security later |

---

## Which features require a backend? (summary)

**Work today, no backend needed:** browsing all books, category filters,
book detail pages, cart, the visual checkout page, About/Poetry/Contact,
Instagram links, and the demo admin UI (browser-only).

**Require the `/api` backend + a database to be real:** actually charging a
card/UPI, verifying that payment, issuing a secure ebook download link,
"My Orders" showing real purchase history, and a permanent (multi-device)
admin dashboard. Sections 6, 7, and 9 above walk through wiring each of
these up when you're ready — the entire frontend has already been built to
plug straight into them.

---

## Design notes

- **Typefaces:** Noto Nastaliq Urdu for all Urdu text, Cormorant Garamond
  for English display type (titles, prices), Inter for interface/body text.
- **Palette:** near-black ink (`#15120F`), warm off-white paper (`#F8F3E9`),
  parchment/sand neutrals, and a single muted gold accent (`#A9834A`) used
  sparingly — on prices, active states, and hover accents only.
- **Motion:** deliberately minimal — hover states and one smooth cover
  scale on book cards, nothing more.
