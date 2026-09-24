// ─────────────────────────────────────────────────────────────────────────
// BOOK CATALOG — the single source of truth for the entire bookstore.
//
// Every page (Home, All Books, Poetry, category filters, Book Details,
// "You may also like") reads from the `books` array below. To publish a
// new book, copy an existing object and edit it — no other file needs to
// change. See README.md → "How to add a new book" for the full field guide.
// ─────────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'novels', label: 'Novels', labelUrdu: 'ناول' },
  { id: 'poetry', label: 'Poetry', labelUrdu: 'شاعری' },
  { id: 'islamic-fiction', label: 'Islamic Fiction', labelUrdu: 'اسلامی فکشن' },
  { id: 'social-fiction', label: 'Social Fiction', labelUrdu: 'سماجی فکشن' },
  { id: 'short-stories', label: 'Short Stories', labelUrdu: 'مختصر کہانیاں' },
  { id: 'upcoming', label: 'Upcoming', labelUrdu: 'جلد آ رہی ہیں' },
]

export const books = [
  // ── REAL BOOKS ──────────────────────────────────────────────────────
  {
    id: 'darmiyan',
    title: 'درمیان',
    romanTitle: 'Darmiyan',
    author: 'مہک سعدیہ',
    description: 'دو دلوں کے بیچ کے ان کہے فاصلوں کی کہانی۔',
    descriptionEn: 'A story of the unspoken distance that grows between two hearts.',
    aboutBook:
      'درمیان ایک ایسی کہانی ہے جو محبت، خاموشی اور فاصلوں کے بیچ جھولتی ہے۔ یہ ناول ان لمحوں کی بات کرتا ہے جو کہے نہیں جاتے مگر محسوس ضرور ہوتے ہیں — وہ درمیانی جگہ جہاں رشتے نہ مکمل طور پر ٹوٹتے ہیں نہ مکمل طور پر جڑتے ہیں۔',
    price: 149,
    coverPalette: ['#15130F', '#A9803F'],
    cover: null,
    pdf: null, // real file lives in private backend storage — see README §6
    sample: null,
    genre: 'novels',
    language: 'Urdu',
    pages: 168,
    format: ['PDF', 'EPUB'],
    status: 'available',
    featured: true,
    publishedDate: '2024-11-10',
    isPlaceholder: false,
  },
  {
    id: 'jo-log-marey-nahi-thay',
    title: 'جو لوگ مرے نہیں تھے',
    romanTitle: 'Jo Log Marey Nahi Thay',
    author: 'مہک سعدیہ',
    description: 'زندہ رہ کر بھی چپ چاپ مر جانے والوں کی کہانی۔',
    descriptionEn: 'A story of those who kept living while something in them quietly died.',
    aboutBook:
      'جو لوگ مرے نہیں تھے ان کرداروں کی کہانی ہے جو ظاہری طور پر زندہ رہے مگر اندر ہی اندر کچھ ٹوٹتا رہا۔ یہ ناول انسانی نفسیات، صدمے اور خاموش برداشت کی گہرائیوں میں اترتا ہے۔',
    price: 179,
    coverPalette: ['#171310', '#A9803F'],
    cover: null,
    pdf: null,
    sample: null,
    genre: 'novels',
    language: 'Urdu',
    pages: 204,
    format: ['PDF'],
    status: 'available',
    featured: true,
    publishedDate: '2025-02-20',
    isPlaceholder: false,
  },

  // ── PLACEHOLDER BOOKS — clearly marked, replace before real launch ──
  {
    id: 'chup-si-sada',
    title: 'چپ سی صدا',
    romanTitle: '[PLACEHOLDER] Chup Si Sada',
    author: 'مہک سعدیہ',
    description: '[نمونہ] خاموشی میں چھپی نظموں کا مجموعہ۔',
    descriptionEn: '[PLACEHOLDER] A collection of verses hidden inside silence.',
    aboutBook: '[PLACEHOLDER TEXT — replace with the real description before launch.]',
    price: 99,
    coverPalette: ['#1B1713', '#C9A667'],
    cover: null,
    pdf: null,
    sample: null,
    genre: 'poetry',
    language: 'Both',
    pages: 84,
    format: ['PDF'],
    status: 'available',
    featured: true,
    publishedDate: '2025-05-01',
    isPlaceholder: true,
  },
  {
    id: 'khwabon-ke-saye',
    title: 'خوابوں کے سائے',
    romanTitle: '[PLACEHOLDER] Khwabon Ke Saye',
    author: 'مہک سعدیہ',
    description: '[نمونہ] خوابوں اور یادوں پر لکھی گئی نظمیں۔',
    descriptionEn: '[PLACEHOLDER] Poems written on dreams and memory.',
    aboutBook: '[PLACEHOLDER TEXT] Details will be added closer to publication.',
    price: null,
    coverPalette: ['#171310', '#8C6B39'],
    cover: null,
    pdf: null,
    sample: null,
    genre: 'poetry',
    language: 'Urdu',
    pages: null,
    format: ['PDF'],
    status: 'coming-soon',
    featured: false,
    publishedDate: '2026-01-01',
    isPlaceholder: true,
  },
  {
    id: 'roshni-ka-safar',
    title: 'روشنی کا سفر',
    romanTitle: '[PLACEHOLDER] Roshni Ka Safar',
    author: 'مہک سعدیہ',
    description: '[نمونہ] ایمان اور تلاش کے سفر کی داستان۔',
    descriptionEn: '[PLACEHOLDER] A journey of faith and searching.',
    aboutBook: '[PLACEHOLDER TEXT] Details will be added closer to publication.',
    price: null,
    coverPalette: ['#15130F', '#A9803F'],
    cover: null,
    pdf: null,
    sample: null,
    genre: 'islamic-fiction',
    language: 'Urdu',
    pages: null,
    format: ['PDF'],
    status: 'coming-soon',
    featured: false,
    publishedDate: '2026-02-01',
    isPlaceholder: true,
  },
  {
    id: 'shehar-ki-galiyan',
    title: 'شہر کی گلیاں',
    romanTitle: '[PLACEHOLDER] Shehar Ki Galiyan',
    author: 'مہک سعدیہ',
    description: '[نمونہ] شہر کی گلیوں میں بکھری سماجی کہانیاں۔',
    descriptionEn: '[PLACEHOLDER] Social stories scattered through the city\u2019s streets.',
    aboutBook: '[PLACEHOLDER TEXT] Details will be added closer to publication.',
    price: null,
    coverPalette: ['#1B1713', '#93713D'],
    cover: null,
    pdf: null,
    sample: null,
    genre: 'social-fiction',
    language: 'Urdu',
    pages: null,
    format: ['PDF'],
    status: 'coming-soon',
    featured: false,
    publishedDate: '2026-03-01',
    isPlaceholder: true,
  },
  {
    id: 'bikhre-lamhe',
    title: 'بکھرے لمحے',
    romanTitle: '[PLACEHOLDER] Bikhre Lamhe',
    author: 'مہک سعدیہ',
    description: '[نمونہ] زندگی کے بکھرے ہوئے لمحوں کی مختصر کہانیاں۔',
    descriptionEn: '[PLACEHOLDER] Short stories of life\u2019s scattered moments.',
    aboutBook: '[PLACEHOLDER TEXT] Details will be added closer to publication.',
    price: null,
    coverPalette: ['#171310', '#A9803F'],
    cover: null,
    pdf: null,
    sample: null,
    genre: 'short-stories',
    language: 'Urdu',
    pages: null,
    format: ['PDF'],
    status: 'coming-soon',
    featured: false,
    publishedDate: '2026-04-01',
    isPlaceholder: true,
  },
]

// ---- Helper functions — import these rather than re-writing this logic ----

export function getBookById(id) {
  return books.find((b) => b.id === id)
}

export function getFeaturedBooks() {
  return books.filter((b) => b.featured)
}

export function getBooksByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return books
  if (categoryId === 'upcoming') return books.filter((b) => b.status === 'coming-soon')
  return books.filter((b) => b.genre === categoryId)
}

export function getRelatedBooks(book, limit = 3) {
  const sameGenre = books.filter((b) => b.id !== book.id && b.genre === book.genre)
  const others = books.filter((b) => b.id !== book.id && b.genre !== book.genre)
  return [...sameGenre, ...others].slice(0, limit)
}
