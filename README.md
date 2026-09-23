# Mahek Sadia — Official Digital Bookstore

Vercel-ready React/Vite storefront. The missing `src/main.jsx` and stylesheet are included so the blank white page is fixed.

## Run
npm install
npm run dev

## Vercel
Build command: `npm run build`
Output: `dist`

## Ebook uploads
The included Admin panel accepts PDF files and stores them in the browser's IndexedDB, then opens them in the site's reader. This is a working browser-local version. For a production multi-device store, connect Supabase Storage + authentication and private signed URLs before selling protected files.

## Currency
INR is the default. The selector supports INR, USD, GBP, EUR, AED, SAR, CAD and AUD. Conversion values are starter display rates and should be connected to a live exchange-rate service before relying on them for international sales.
