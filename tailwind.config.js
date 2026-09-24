/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#15120F',        // near-black, warm (not pure #000)
        charcoal: '#2A241C',   // body text on light backgrounds
        paper: '#F8F3E9',      // main site background, warm off-white
        parchment: '#F1E9D8',  // slightly deeper card / note background
        sand: '#EFE4CC',       // section background
        line: '#DBCDA8',       // hairline borders
        gold: '#A9834A',       // muted gold accent
        goldSoft: '#C9A667',   // lighter gold for hovers
        cream: '#FBF8F1',
      },
      fontFamily: {
        nastaliq: ['"Noto Nastaliq Urdu"', 'serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        // subtle, warm-toned shadow for book covers — no generic grey glow
        book: '0 18px 34px -18px rgba(21, 18, 15, 0.45), 0 2px 6px -1px rgba(21, 18, 15, 0.12)',
      },
      letterSpacing: {
        widest2: '0.22em',
      },
    },
  },
  plugins: [],
}
