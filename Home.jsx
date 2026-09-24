import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import BookGrid from '../components/BookGrid.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { getFeaturedBooks, CATEGORIES, getBooksByCategory } from '../data/books.js'

export default function Home() {
  const featured = getFeaturedBooks()

  return (
    <div>
      <Hero />

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <SectionHeading urdu="منتخب کتابیں" english="Featured Books" />
        <BookGrid books={featured} />
      </section>

      <section className="hairline max-w-6xl mx-auto" />

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <SectionHeading urdu="اقسام" english="Browse by Category" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const count = getBooksByCategory(cat.id).length
            return (
              <Link
                key={cat.id}
                to={`/books?category=${cat.id}`}
                className="border border-line rounded-sm p-6 flex flex-col gap-1 hover:border-gold transition-colors"
              >
                <span className="urdu text-xl text-ink">{cat.labelUrdu}</span>
                <span className="font-display italic text-ink/50 text-sm">{cat.label}</span>
                <span className="text-[11px] text-ink/40 mt-2">{count} title{count === 1 ? '' : 's'}</span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
