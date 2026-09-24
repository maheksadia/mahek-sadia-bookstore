import BookGrid from '../components/BookGrid.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { getBooksByCategory } from '../data/books.js'

export default function Poetry() {
  const poetry = getBooksByCategory('poetry')

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <SectionHeading urdu="شاعری" english="Poetry Collections" align="center" />
      <p className="font-display italic text-ink/50 text-center max-w-md mx-auto -mt-4 mb-12">
        Verses on longing, faith and the unseen weight of ordinary days.
      </p>
      <BookGrid books={poetry} />
    </div>
  )
}
