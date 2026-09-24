import { useParams, useNavigate, Link } from 'react-router-dom'
import BookCover from '../components/BookCover.jsx'
import BookGrid from '../components/BookGrid.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { getBookById, getRelatedBooks } from '../data/books.js'
import { formatPrice, statusLabel } from '../utils/format.js'
import { useCart } from '../context/CartContext.jsx'

export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const book = getBookById(id)

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <p className="font-display italic text-ink/60 text-lg">
          This book could not be found. It may have been removed or renamed.
        </p>
        <Link to="/books" className="inline-block mt-6 text-gold underline">
          Back to all books
        </Link>
      </div>
    )
  }

  const isComingSoon = book.status === 'coming-soon'
  const related = getRelatedBooks(book)

  function handleBuyNow() {
    addItem(book)
    navigate('/checkout')
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <div className="aspect-[3/4] max-w-sm mx-auto md:mx-0 w-full rounded-sm overflow-hidden shadow-book">
          <BookCover book={book} />
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] tracking-widest2 uppercase text-ink/40 mb-3">
            {statusLabel(book.status)}
          </span>
          <h1 className="urdu text-4xl text-ink leading-snug">{book.title}</h1>
          <p className="font-display italic text-ink/50 text-lg mt-1">{book.romanTitle}</p>
          <p className="text-sm text-ink/50 mt-2">by {book.author}</p>

          <div className="hairline w-full my-6" />

          <p className="urdu text-lg text-ink/80 leading-loose">{book.description}</p>
          <p className="font-display text-ink/60 mt-4 text-[15px] leading-relaxed">
            {book.descriptionEn}
          </p>

          <dl className="grid grid-cols-2 gap-y-3 mt-8 text-sm">
            <dt className="text-ink/40">Genre</dt>
            <dd className="text-ink/80 capitalize">{book.genre.replace('-', ' ')}</dd>
            <dt className="text-ink/40">Language</dt>
            <dd className="text-ink/80">{book.language}</dd>
            <dt className="text-ink/40">Pages</dt>
            <dd className="text-ink/80">{book.pages ?? 'TBA'}</dd>
            <dt className="text-ink/40">Format</dt>
            <dd className="text-ink/80">{book.format?.join(', ')}</dd>
          </dl>

          <div className="flex items-center justify-between mt-8">
            <span className="font-display text-3xl text-ink">
              {isComingSoon ? 'Coming Soon' : formatPrice(book.price)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              disabled={isComingSoon}
              onClick={handleBuyNow}
              className="flex-1 bg-ink text-paper text-sm tracking-wide rounded-sm py-3 hover:bg-gold transition-colors disabled:opacity-40"
            >
              Buy Now
            </button>
            <button
              disabled={isComingSoon}
              onClick={() => addItem(book)}
              className="flex-1 border border-ink/25 text-ink text-sm tracking-wide rounded-sm py-3 hover:border-ink transition-colors disabled:opacity-40"
            >
              Add to Cart
            </button>
          </div>

          <button
            disabled={!book.sample}
            className="mt-3 text-sm text-gold underline disabled:no-underline disabled:text-ink/30"
          >
            {book.sample ? 'Read Sample' : 'Sample not available yet'}
          </button>
        </div>
      </div>

      {book.aboutBook && (
        <div className="mt-16 max-w-prose">
          <SectionHeading urdu="کتاب کے بارے میں" english="About the Book" />
          <p className="urdu text-lg text-ink/80 leading-loose">{book.aboutBook}</p>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-20">
          <SectionHeading urdu="مزید پسند آ سکتی ہیں" english="You May Also Like" />
          <BookGrid books={related} />
        </div>
      )}
    </div>
  )
}
